import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
const firebaseApp=initializeApp({
    apiKey: "AIzaSyDFi_UsPY_GoDCT41N4BgmPDRR7dDGO4nE",
    authDomain: "chat-firebase-4ad0a.firebaseapp.com",
    projectId: "chat-firebase-4ad0a",
    storageBucket: "chat-firebase-4ad0a.appspot.com",
    messagingSenderId: "179006366118",
    appId: "1:179006366118:web:49feef647df87a95fcef67",
    measurementId: "G-TNWJS65GYC"
})

const db=firebaseApp.firestore()

const auth=firebase.auth();

export {db,auth}