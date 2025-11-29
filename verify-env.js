require('dotenv').config();

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY
};

const fs = require('fs');

let output = "Loaded Config:\n";
for (const [key, value] of Object.entries(config)) {
    if (!value) {
        output += `${key}: MISSING\n`;
    } else {
        output += `${key}: ${value.substring(0, 5)}... (${value.length} chars)\n`;
    }
}

const adminProjectId = process.env.FIREBASE_PROJECT_ID;
const clientProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

output += `\nProject ID Check:\n`;
output += `FIREBASE_PROJECT_ID: ${adminProjectId}\n`;
output += `NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${clientProjectId}\n`;
output += `Match: ${adminProjectId === clientProjectId ? 'YES' : 'NO'}\n`;

fs.writeFileSync('env-check.txt', output, 'utf8');
console.log("Check complete. Output written to env-check.txt");
