import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};

const firebaseConfig = {
  apiKey: extra.firebaseApiKey,
  authDomain: extra.firebaseAuthDomain,
  projectId: extra.firebaseProjectId,
  storageBucket: extra.firebaseStorageBucket,
  messagingSenderId: extra.firebaseMessagingSenderId,
  appId: extra.firebaseAppId,
  measurementId: extra.firebaseMeasurementId,
};

// export const fireDB = app.firestore();
const app = initializeApp(firebaseConfig);
const authen = getAuth(app);
const db = getFirestore();
const rtdb = getDatabase(app);

export { authen, db, rtdb };

// export const db = getFirestore(app);

// Initialize Firebase
//   const app = initializeApp(firebaseConfig);
