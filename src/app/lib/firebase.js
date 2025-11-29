import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage, deleteToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
console.log("Client (App) Project ID:", app.options.projectId);

export const getMessagingInstance = () => {
    if (typeof window !== "undefined") {
        return getMessaging(app);
    }
    return null;
};

export async function requestNotificationPermission() {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const messaging = getMessagingInstance();
            if (messaging) {
                console.log("Using VAPID Key:", process.env.NEXT_PUBLIC_VAPID_KEY);

                // FORCE REFRESH: Delete old token to ensure we get a new one for the correct VAPID key
                try {
                    await deleteToken(messaging);
                    console.log("Old token deleted.");
                } catch (e) {
                    console.warn("Failed to delete old token:", e);
                }

                const token = await getToken(messaging, {
                    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
                });
                return { success: true, token };
            }
        }
        return { success: false, error: "Permission denied" };
    } catch (error) {
        console.error("Error getting notification permission:", error);
        return { success: false, error: error.message };
    }
}

export function onForegroundMessage(callback) {
    const messaging = getMessagingInstance();
    if (messaging) {
        return onMessage(messaging, callback);
    }
}

export default app;
