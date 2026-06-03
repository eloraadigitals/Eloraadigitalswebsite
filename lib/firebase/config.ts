// =============================================================================
// Eloraa Digitals — Firebase Configuration
// =============================================================================
//
// 🔧 SETUP REQUIRED: Replace these with your Firebase project credentials
// Visit https://console.firebase.google.com → Create Project → Add Web App → Copy config
// See FIREBASE_SETUP.md at the project root for step-by-step instructions.
//
// =============================================================================

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID",
};

// ---------------------------------------------------------------------------
// Check if Firebase is properly configured
// ---------------------------------------------------------------------------

export function isFirebaseConfigured(): boolean {
  return (
    firebaseConfig.apiKey !== "YOUR_API_KEY" &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
    !!firebaseConfig.apiKey &&
    !!firebaseConfig.projectId
  );
}

// ---------------------------------------------------------------------------
// Initialize Firebase (singleton pattern)
// ---------------------------------------------------------------------------

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured()) {
    if (typeof window !== "undefined") {
      console.warn(
        "⚠️ Firebase is not configured. See FIREBASE_SETUP.md for instructions."
      );
    }
    return null;
  }

  if (!app && getApps().length === 0) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      return null;
    }
  } else if (!app) {
    app = getApps()[0];
  }

  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (auth) return auth;
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  try {
    auth = getAuth(firebaseApp);
    return auth;
  } catch (error) {
    console.error("Failed to initialize Firebase Auth:", error);
    return null;
  }
}

export function getFirebaseDb(): Firestore | null {
  if (db) return db;
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  try {
    db = getFirestore(firebaseApp);
    return db;
  } catch (error) {
    console.error("Failed to initialize Firestore:", error);
    return null;
  }
}

export function getFirebaseStorage(): FirebaseStorage | null {
  if (storage) return storage;
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  try {
    storage = getStorage(firebaseApp);
    return storage;
  } catch (error) {
    console.error("Failed to initialize Firebase Storage:", error);
    return null;
  }
}
