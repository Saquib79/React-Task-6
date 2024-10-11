// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCR0_a5lzypHGojozzky9UK-qXOA0NcuMM",
  authDomain: "to-do-list-task-1f81a.firebaseapp.com",
  projectId: "to-do-list-task-1f81a",
  storageBucket: "to-do-list-task-1f81a.appspot.com",
  messagingSenderId: "680193633674",
  appId: "1:680193633674:web:cd0939d7c1065824562c73"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
