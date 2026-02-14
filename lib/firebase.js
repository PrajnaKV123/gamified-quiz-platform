// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBePM4I72xQx5lB508jUtOpIVQqzJORnLI",
  authDomain: "thinkrush-83019.firebaseapp.com",
  projectId: "thinkrush-83019",
  storageBucket: "thinkrush-83019.firebasestorage.app",
  messagingSenderId: "781796149955",
  appId: "1:781796149955:web:816ee34eafbd87e3253076"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();