import { FirebaseError, getApp, getApps, initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const ALLOWED_EMAIL_DOMAIN = "@stratsync.ai";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId,
];

export async function signInWithGoogle(remember: boolean) {
  if (requiredConfig.some((value) => !value)) {
    throw new Error("Firebase configuration is missing. Add it to your .env.local file.");
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account", hd: "stratsync.ai" });

  const result = await signInWithPopup(auth, provider);
  const email = result.user.email?.trim().toLowerCase();

  if (!email?.endsWith(ALLOWED_EMAIL_DOMAIN)) {
    await signOut(auth);
    throw new Error("Access is restricted to @stratsync.ai email accounts.");
  }

  const token = await result.user.getIdToken();

  return {
    user: {
      email,
      name: result.user.displayName ?? email.split("@")[0],
    },
    token,
  };
}

export function getFirebaseAuthError(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return error instanceof Error ? error.message : "Unable to sign in with Google";
  }

  switch (error.code) {
    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in popup. Please allow popups and try again.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized in Firebase Authentication.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return error.message || "Unable to sign in with Google";
  }
}
