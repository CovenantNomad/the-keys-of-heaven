import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBkBCFJePQDRaOXQJRdl7O2oZg_canWHio',
  authDomain: 'the-keys-of-heaven.firebaseapp.com',
  projectId: 'the-keys-of-heaven',
  storageBucket: 'the-keys-of-heaven.appspot.com',
  messagingSenderId: '895138729785',
  appId: '1:895138729785:web:3ba68e6d11da7a508e22e8',
  measurementId: 'G-1PXND9XVW3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
