// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMYUqxD09Tw6BwSO-6TXSksmrS6t4oAFI",
  authDomain: "collabed-d8ed1.firebaseapp.com",
  projectId: "collabed-d8ed1",
  storageBucket: "collabed-d8ed1.firebasestorage.app",
  messagingSenderId: "940390685279",
  appId: "1:940390685279:web:7e0587538888a1d21b19ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
