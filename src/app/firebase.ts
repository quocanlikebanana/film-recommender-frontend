import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBGPH_CyiipDhWDjcp4Ktu-OkNd6juLNg4',
    authDomain: 'filmrecommender-2fabd.firebaseapp.com',
    projectId: 'filmrecommender-2fabd',
    storageBucket: 'filmrecommender-2fabd.firebasestorage.app',
    messagingSenderId: '362600653473',
    appId: '1:362600653473:web:39e12535be7446034846e0',
    measurementId: 'G-83NZE40G2K',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;