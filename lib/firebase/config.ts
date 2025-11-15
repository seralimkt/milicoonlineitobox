"use client"

import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBjqDS2dm1YfgeZKxbT2E37sAuAogEUAuk",
  authDomain: "ricuras-del-coste.firebaseapp.com",
  projectId: "ricuras-del-coste",
  storageBucket: "ricuras-del-coste.firebasestorage.app",
  messagingSenderId: "362741201723",
  appId: "1:362741201723:web:a32e54ea934c28e7dcd51e",
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize services
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

// Initialize Analytics (only in browser)
let analytics
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

export { db, auth, storage, analytics }
