import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCh128CojY3e_hY7Va1HcAZYxpVI7mhax0",
    authDomain: "calendar-project-4f8c4.firebaseapp.com",
    projectId: "calendar-project-4f8c4",
    storageBucket: "calendar-project-4f8c4.firebasestorage.app",
    messagingSenderId: "258626282659",
    appId: "1:258626282659:web:16cf6879f57f60e936cb16",
    measurementId: "G-CF7WNYD72M"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const addEventToDB = async (event) => {
    const eventRef = ref(db, 'events/' + Date.now());
    await set(eventRef, event);
    return eventRef.key;
};
