import firebase from "firebase";
import { Contact, Log } from "./models";
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
    const { id } = await collection('logs').add({
        author: userId,
        log
    });
    return id;
}


export async function getUser(id: string): Promise<Contact> {
    return (await collection('users').doc(id).get()).data() as Promise<Contact>;
}

export async function processLog(userId: string, log: string) {
    const user = await getUser(userId);
    if (user && user.phone) {
        /**
         * user is not null lets now check if the log exists, if it does then alert the user and update the log invoked timestamp
         * if the log does not exist, create it and notifies the user that this log has been added to his account.
         * if there is no user return error to the API caller
         */
        const logData: Log = await getLog(userId, log);

        if (!!logData) {
            // increment the number of invokation and alert the user
            await updateLog(logData.id);
            await sendMessage(user.phone, logData.log)  
        } else {
            await createLog(userId, log);
            await sendMessage(user.phone, `${log} added to your watch list`);
        }
    } else {
        throw new Error('User does not exists');
    }
}

// returns the first Object matching log message and userId
export async function getLog(userId: string, log: string): Promise<any> {
    const snapshots = await collection('logs')
        .where('log', '==', log)
        .where('userId', '==', userId)
        .get();

    const doc = snapshots.docs && snapshots.docs[0];
    return doc ? doc.data() : null;
}

async function createLog(userId: string, log: string) {
    const doc: Log = {
        id: collection('logs').doc().id,
        userId,
        invokedTimes: 0,
        createTime: new Date().getTime(),
        log
    };

    return collection('logs').doc(doc.id).set(doc);
}

export async function getLogs() {
    const {docs} = await collection('logs').get();
    return docs? docs.map(doc => doc.data()) : [];
}

export async function getUsers() {
    const {docs} = await collection('users').get();
    return docs? docs.map(doc => doc.data()) : [];
}

async function updateLog(logId: string) {
    return collection('logs').doc(logId).update({
        lastInvoked: new Date().getTime(),
        invokedTimes: firebase.firestore.FieldValue.increment(1)
    })
}

function collection(id: 'logs' | 'users') {
    return db.collection(id);
}