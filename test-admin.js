require('dotenv').config();
const admin = require('firebase-admin');

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

console.log("Testing Firebase Admin Connection...");
console.log("Project ID:", serviceAccount.projectId);
console.log("Client Email:", serviceAccount.clientEmail);

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Admin SDK Initialized");
} catch (e) {
    console.error("❌ Init Failed:", e.message);
    process.exit(1);
}

const db = admin.firestore();

async function testFirestore() {
    try {
        console.log("Attempting to read from Firestore...");
        const snapshot = await db.collection('notification_subscriptions').limit(1).get();
        console.log("✅ Firestore Read Success. Docs found:", snapshot.size);
        if (!snapshot.empty) {
            const data = snapshot.docs[0].data();
            const token = data.fcm_token;
            console.log("Sample Token:", token ? token.substring(0, 20) + "..." : "No Token");

            if (token) {
                console.log("Attempting to send dry-run message...");
                try {
                    const message = {
                        token: token,
                        notification: {
                            title: "Test",
                            body: "Test Body"
                        }
                    };
                    const response = await admin.messaging().send(message, true); // true for dry-run
                    console.log("✅ Dry-run Send Success:", response);
                } catch (msgError) {
                    console.error("❌ Dry-run Send Failed:", msgError.code, msgError.message);
                }
            }
        }
    } catch (e) {
        console.error("❌ Firestore Read Failed:", e.message);
    }
}

testFirestore();
