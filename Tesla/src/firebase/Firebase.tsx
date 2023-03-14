import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB4bULhkfRK0UhNY5MiGdwqsNymunOV3ck",
  authDomain: "fir-1ce3f.firebaseapp.com",
  projectId: "fir-1ce3f",
  storageBucket: "fir-1ce3f.appspot.com",
  messagingSenderId: "1062352421611",
  appId: "1:1062352421611:web:3a5faecd20aa703d3d74ae",
  measurementId: "G-BGW4L139Z7"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);