import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyByFVJRpBJqT01MpPIOIefsBfOx7uZVg-k",
    authDomain: "nwlassessment.firebaseapp.com",
    projectId: "nwlassessment",
    storageBucket: "nwlassessment.appspot.com",
    messagingSenderId: "363886981507",
    appId: "1:363886981507:web:b572afc71e5e4ad11486b6",
    measurementId: "G-G7HHVXCJ27"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
