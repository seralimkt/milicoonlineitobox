"use client"

import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDcVYH_DsdlIdvaRuBzME6Dc9iQjSyEGpQ",
  authDomain: "milicoonline-itobox.firebaseapp.com",
  projectId: "milicoonline-itobox",
  storageBucket: "milicoonline-itobox.firebasestorage.app",
  messagingSenderId: "826975049398",
  appId: "1:826975049398:web:a30b51fcc5b5185e91b817"
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
