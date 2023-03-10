import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyByFVJRpBJqT01MpPIOIefsBfOx7uZVg-k",
//     authDomain: "nwlassessment.firebaseapp.com",
//     projectId: "nwlassessment",
//     storageBucket: "nwlassessment.appspot.com",
//     messagingSenderId: "363886981507",rhhhgt 4g5 2g
//     appId: "1:363886981507:web:b572afc71e5e4ad11486b6",
//     measurementId: "G-G7HHVXCJ27"
// };
const firebaseConfig = {
    apiKey: "AIzaSyDGLTicu_o-5py0J22Z9qA5WWXatJZVQnQ",
    authDomain: "nwl-asset-management-app-44b00.firebaseapp.com",
    projectId: "nwl-asset-management-app-44b00",
    storageBucket: "nwl-asset-management-app-44b00.appspot.com",
    messagingSenderId: "753487831996",
    appId: "1:753487831996:web:3301f74e0e788144e001b9"
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);