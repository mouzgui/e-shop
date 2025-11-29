import admin from "firebase-admin";

if (!admin.apps.length) {
    try {
        if (!process.env.FIREBASE_PRIVATE_KEY) {
            throw new Error("FIREBASE_PRIVATE_KEY is missing from env vars");
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            }),
        });
        console.log("✅ Firebase Admin initialized successfully");
    } catch (error) {
        console.error("❌ Firebase Admin initialization error:", error);
    }
}

let db;
let messaging;

try {
    if (admin.apps.length) {
        db = admin.firestore();
        messaging = admin.messaging();
    }
} catch (error) {
    console.error("❌ Error accessing Firebase services:", error);
}

export { db, messaging };

export default admin;
