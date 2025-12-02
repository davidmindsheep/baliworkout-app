import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAiOZa7Ee6MYYoDfys2aP7j34eJzDXiPx4",
    authDomain: "baliworkout.firebaseapp.com",
    projectId: "baliworkout",
    storageBucket: "baliworkout.firebasestorage.app",
    messagingSenderId: "149103131054",
    appId: "1:149103131054:web:662122096672482d40f03f",
    measurementId: "G-8Z7MNK83G0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
