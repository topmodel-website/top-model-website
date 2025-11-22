import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAbD42AQ5lRxRZdfNvGzsajy7wW4gsw3HU",
    authDomain: "topmodel-apply.firebaseapp.com",
    projectId: "topmodel-apply",
    storageBucket: "topmodel-apply.firebasestorage.app",
    messagingSenderId: "585528047962",
    appId: "1:585528047962:web:eed18f72330de651cf5b63",
    measurementId: "G-Y0KVQYN5QR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
