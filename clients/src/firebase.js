import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'



const firebaseconfig = {
    apiKey: "AIzaSyAT_5GddkCJFTxGHjCF5bVhCcFJJ6OjaVU",
    authDomain: "social-media-98ed5.firebaseapp.com",
    projectId: "social-media-98ed5",
    storageBucket: "social-media-98ed5.appspot.com",
    messagingSenderId: "572696289192",
    appId: "1:572696289192:web:c6a372b9fd157c6a9a879d",
    measurementId: "G-DKXD4DYPWP"
}

const app = initializeApp(firebaseconfig);
export const auth = getAuth(app);
