import { initializeApp, getApp, getApps } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import Keys from "../../constants/keys";

export const firebaseApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        apiKey: "AIzaSyBd8WNfi7cZWLAZX3BxyT-5qbnUUR6GgJY",
        authDomain: "bossa-challenge.firebaseapp.com",
        projectId: "bossa-challenge",
        storageBucket: "bossa-challenge.appspot.com",
        messagingSenderId: "695175764590",
        appId: "1:695175764590:web:7df0d48bcc9564beaea47f",
      });

export const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });

// apiKey: Keys.FIREBASE_API_KEY,
// authDomain: Keys.FIREBASE_AUTH_DOMAIN,
// projectId: Keys.FIREBASE_PROJECT_ID,
// storageBucket: Keys.FIREBASE_STORAGE_BUCKET,
// messagingSenderId: Keys.FIREBASE_MESSAGING_SENDER_ID,
// appId: Keys.FIREBASE_APP_ID,