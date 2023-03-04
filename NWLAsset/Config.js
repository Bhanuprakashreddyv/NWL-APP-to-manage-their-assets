import firebase, { initializeApp, getApp, getApps } from 'firebase/app';

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
if (getApps().length === 0) {
    initializeApp(firebaseConfig)

}
else {
    getApp();
}

export { firebase }