// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// import { firebaseConfig } from "./config";
const firebaseConfig = {
	apiKey: 'AIzaSyBPQqHAulE8Zaxm51Enx0-hKpao7mJHtEY',
	authDomain: 'nexus-17098.firebaseapp.com',
	projectId: 'nexus-17098',
	storageBucket: 'nexus-17098.appspot.com',
	messagingSenderId: '535188418170',
	appId: '1:535188418170:web:575a03ceb11e6f719ed5c3',
	measurementId: 'G-WH5EEL8VBF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'en';
