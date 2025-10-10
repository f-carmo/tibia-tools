const fs = require('fs');
const path = require('path');
require('dotenv').config();

const envPath = path.resolve(__dirname, '../src/environments/environment.ts');
const firebase = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const content = `export const environment = {
  production: false,
  firebase: ${JSON.stringify(firebase, null, 2)}
};`;

fs.writeFileSync(envPath, content);
console.log('✅ Firebase env injected into environment.ts');
