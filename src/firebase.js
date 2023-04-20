import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBrUAqsZJ-7CaqU3NI5kfxQBcxL8znSCtc',
  authDomain: 'movie-project-d0e72.firebaseapp.com',
  databaseURL:
    'https://movie-project-d0e72-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'movie-project-d0e72',
  storageBucket: 'movie-project-d0e72.appspot.com',
  messagingSenderId: '678750120122',
  appId: '1:678750120122:web:fca5c8860f70aa309d3a83',
  measurementId: 'G-9CHECBP6BQ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
