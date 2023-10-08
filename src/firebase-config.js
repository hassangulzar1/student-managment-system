import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGKSYj4gGzvFGT99Le3R6KHCm0MqQjTWU",
  authDomain: "student-management-syste-73d37.firebaseapp.com",
  projectId: "student-management-syste-73d37",
  storageBucket: "student-management-syste-73d37.appspot.com",
  messagingSenderId: "247199745716",
  appId: "1:247199745716:web:1d6e429706e9803ec7b9e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth, firebaseConfig };
