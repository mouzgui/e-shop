import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function POST(request) {
    try {
        const { token, email, preferences } = await request.json();

        if (!db) {
            console.error("Firebase Admin not initialized");
            return NextResponse.json(
                { error: "Internal Server Error: Firebase not initialized" },
                { status: 500 }
            );
        }

        if (!token || !email) {
            return NextResponse.json(
                { error: "FCM token and email are required" },
                { status: 400 }
            );
        }

        // Store token in Firestore
        const docRef = db.collection("notification_subscriptions").doc(email);
        await docRef.set({
            email,
            fcm_token: token,
            subscribed_at: new Date(),
            last_updated: new Date(),
            preferences: preferences || {
                order_confirmation: true,
                order_shipped: true,
                order_delivered: true,
                promotions: false,
            },
        }, { merge: true });

        console.log("📝 Subscribed:", email);

        return NextResponse.json({
            success: true,
            message: "Successfully subscribed to notifications"
        });
    } catch (error) {
        console.error("Subscription error:", error);
        return NextResponse.json(
            { error: "Failed to subscribe" },
            { status: 500 }
        );
    }
}

// Update preferences
export async function PATCH(request) {
    try {
        const { email, preferences } = await request.json();

        const docRef = db.collection("notification_subscriptions").doc(email);
        await docRef.update({
            preferences,
            last_updated: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Preference update error:", error);
        return NextResponse.json(
            { error: "Failed to update preferences" },
            { status: 500 }
        );
    }
}
