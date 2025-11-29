import { NextResponse } from "next/server";
import { db, messaging } from "@/lib/firebaseAdmin";
import crypto from "crypto";

export async function POST(request) {
    try {
        const body = await request.text();
        const signature = request.headers.get("x-wc-webhook-signature");
        const secret = process.env.WOOCOMMERCE_WEBHOOK_SECRET;

        // Verify signature if secret is set
        if (secret && signature) {
            const expectedSignature = crypto
                .createHmac("sha256", secret)
                .update(body)
                .digest("base64");

            if (signature !== expectedSignature) {
                console.error("❌ Invalid webhook signature");
                return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
            }
        }

        const event = JSON.parse(body);
        const { id, status, billing, meta_data } = event;
        const email = billing?.email;

        console.log(`📦 Webhook received for order #${id}, status: ${status}`);

        if (!email) {
            return NextResponse.json({ message: "No email associated with order" });
        }

        // Determine notification type based on status
        let notificationType = null;
        let title = "";
        let bodyText = "";

        switch (status) {
            case "processing":
                // Usually handled by immediate order confirmation, but can be a backup
                break;
            case "completed":
                notificationType = "order_shipped"; // Mapping completed to shipped for simplicity, or separate
                title = "Order Shipped! 🚀";
                bodyText = `Your order #${id} has been shipped and is on its way!`;
                break;
            case "refunded":
                notificationType = "order_refunded";
                title = "Order Refunded 💰";
                bodyText = `Your order #${id} has been refunded.`;
                break;
            // Add more cases as needed
        }

        if (!notificationType) {
            return NextResponse.json({ message: "Status ignored" });
        }

        // Get user's FCM token from Firestore
        const usersRef = db.collection("notification_subscriptions");
        const snapshot = await usersRef.where("email", "==", email).get();

        if (snapshot.empty) {
            console.log(`⚠️ No subscription found for ${email}`);
            return NextResponse.json({ message: "User not subscribed" });
        }

        // Send to all tokens for this user (if multiple devices)
        const sendPromises = snapshot.docs.map(async (doc) => {
            const userData = doc.data();
            const token = userData.fcm_token;

            // Check preferences if implemented
            if (userData.preferences && !userData.preferences[notificationType]) {
                console.log(`User opted out of ${notificationType}`);
                return;
            }

            const message = {
                token,
                notification: {
                    title,
                    body: bodyText,
                },
                webpush: {
                    fcmOptions: {
                        link: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${id}`,
                    },
                    notification: {
                        icon: "/icon-192x192.png",
                        badge: "/badge-72x72.png",
                    },
                },
                data: {
                    orderId: id.toString(),
                    type: notificationType,
                },
            };

            try {
                await messaging.send(message);
                console.log(`✅ Notification sent to ${email} for order #${id}`);
            } catch (error) {
                console.error("Error sending notification:", error);
                if (error.code === 'messaging/registration-token-not-registered') {
                    await doc.ref.delete(); // Remove invalid token
                }
            }
        });

        await Promise.all(sendPromises);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
