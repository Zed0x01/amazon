import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAJPanCDx0RBa1lBWt0FBm7sHFhQB4BT4",
  authDomain: "fir-3c9c1.firebaseapp.com",
  projectId: "fir-3c9c1",
  storageBucket: "fir-3c9c1.appspot.com",
  messagingSenderId: "305670649490",
  appId: "1:305670649490:web:a26f152cf5f52e5c7f984b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
