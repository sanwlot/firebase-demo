import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsNHcUHc9gVArsIM0scY9KfrFsGvU5DdQ",
  authDomain: "fir-tutorial-394a7.firebaseapp.com",
  projectId: "fir-tutorial-394a7",
  storageBucket: "fir-tutorial-394a7.appspot.com",
  messagingSenderId: "120945506819",
  appId: "1:120945506819:web:4b1066241a0ed1abfcac36",
  measurementId: "G-8NHLXLQF90",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
