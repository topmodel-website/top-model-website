import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAWZIMae5AH12NMsabEXuoXMFHyGXPDJKI",
    authDomain: "top-model-website.firebaseapp.com",
    projectId: "top-model-website",
    storageBucket: "top-model-website.firebasestorage.app",
    messagingSenderId: "226188581530",
    appId: "1:226188581530:web:3be6ca7d9a5100411ddd23",
    measurementId: "G-8NYWWRL9JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
