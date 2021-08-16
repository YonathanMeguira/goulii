import firebase from "firebase";
import { sendMessage } from "./twilio.service";

const app = firebase.initializeApp({
    apiKey: "AIzaSyB3NoAIQnbAImTFPRM1aD2bQp6StD4BRjc",
    authDomain: "goulii.firebaseapp.com",
    projectId: "goulii",
    storageBucket: "goulii.appspot.com",
    messagingSenderId: "667490489479",
    appId: "1:667490489479:web:ffd2dcc29e21b879f31422",
    measurementId: "G-DYCXPZDTNQ"
});

const db = app.firestore();

export async function addLog(userId: string, log: string): Promise<string> {
    const {id} = await db.collection('logs').add({
        author: userId,
        log
    });
    return id;
}


export async function sendAlert(phone: string, alert: string) {
    try { 
        const message = sendMessage(phone, alert); 
        return message;
    } catch(error) {
        return error
    }
    
}
