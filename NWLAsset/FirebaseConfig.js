import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, } from 'firebase/firestore';
import { getStorage } from '@firebase/storage';

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
export const storage = getStorage(app);
