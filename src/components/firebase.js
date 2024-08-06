
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhTi0L7AkPWiAgVdzZkJXXNH34AtyxRjg",
  authDomain: "jallzhair-18ac9.firebaseapp.com",
  projectId: "jallzhair-18ac9",
  storageBucket: "jallzhair-18ac9.appspot.com",
  messagingSenderId: "654625306157",
  appId: "1:654625306157:web:9a0d974e9731dec58a2aa4",
  measurementId: "G-XJ0FVE7XZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth=getAuth();
export const db=getFirestore(app);
export const storage = getStorage(app);



export default app;