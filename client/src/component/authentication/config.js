
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAJAd3LrKA5xakRVBOGMtmgTYSp-hCLgMA",
    authDomain: "chat-app-391810.firebaseapp.com",
    projectId: "chat-app-391810",
    storageBucket: "chat-app-391810.appspot.com",
    messagingSenderId: "724278904014",
    appId: "1:724278904014:web:3840d20206d66d343f3c9f",
    measurementId: "G-F237HWNDDR"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()

