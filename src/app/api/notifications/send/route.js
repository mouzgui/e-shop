import { NextResponse } from "next/server";
import { db, messaging } from "@/lib/firebaseAdmin";

export async function POST(request) {
    try {
        const { email, type, orderData } = await request.json();
        console.log(`🔔 Attempting to send '${type}' notification to:`, email);

        // Debug: Log Admin Project ID
        if (db) {
            // Accessing projectId from the initialized app
            // Note: db.app.options.credential might not expose projectId directly depending on init method, 
            // but db.app.options.projectId should be there if set, or we can check the cert.
            console.log("Server (Admin) Project ID:", process.env.FIREBASE_PROJECT_ID);
        }

        if (!db || !messaging) {
            console.error("Firebase Admin not initialized");
            return NextResponse.json(
                { error: "Internal Server Error: Firebase not initialized" },
                { status: 500 }
            );
        }

        if (!email || !type) {
            return NextResponse.json(
                { error: "Email and notification type are required" },
                { status: 400 }
            );
        }

        // Get user's FCM token from Firestore
        const docRef = db.collection("notification_subscriptions").doc(email);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json(
                { error: "No subscription found for this email" },
                { status: 404 }
            );
        }

        const userData = doc.data();
        const token = userData.fcm_token;

        // Check if user has enabled this notification type
        if (userData.preferences && !userData.preferences[type]) {
            return NextResponse.json({
                success: false,
                message: "User has disabled this notification type"
            });
        }

        // Build notification based on type
        const notifications = getNotificationConfig(type, orderData);

        const message = {
            token,
            notification: notifications.notification,
            webpush: {
                fcmOptions: {
                    link: notifications.link,
                },
                notification: {
                    icon: "/icon-192x192.png",
                    badge: "/badge-72x72.png",
                },
            },
            data: notifications.data,
        };

        const response = await messaging.send(message);

        console.log("✅ Notification sent:", response);

        return NextResponse.json({
            success: true,
            messageId: response
        });
    } catch (error) {
        console.error("❌ Send notification error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

function getNotificationConfig(type, orderData) {
    const configs = {
        order_confirmation: {
            notification: {
                title: "🎉 Order Confirmed!",
                body: `Your order #${orderData.orderId} has been confirmed. Total: $${orderData.total}`,
            },
            link: `/orders/${orderData.orderId}`,
            data: {
                type: "order_confirmation",
                orderId: String(orderData.orderId)
            },
        },
        order_shipped: {
            notification: {
                title: "📦 Order Shipped!",
                body: `Your order #${orderData.orderId} is on its way!`,
            },
            link: `/orders/${orderData.orderId}`,
            data: {
                type: "order_shipped",
                orderId: String(orderData.orderId)
            },
        },
        order_delivered: {
            notification: {
                title: "✅ Order Delivered!",
                body: `Your order #${orderData.orderId} has been delivered. Enjoy!`,
            },
            link: `/orders/${orderData.orderId}`,
            data: {
                type: "order_delivered",
                orderId: String(orderData.orderId)
            },
        },
    };

    return configs[type] || configs.order_confirmation;
}
