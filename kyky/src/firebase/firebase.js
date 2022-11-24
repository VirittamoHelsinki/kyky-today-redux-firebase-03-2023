// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCd8cZTwgHh1C2w35cYnMlMGwJ0WavInUg',
  authDomain: 'gygy-tomorrow.firebaseapp.com',
  projectId: 'gygy-tomorrow',
  storageBucket: 'gygy-tomorrow.appspot.com',
  messagingSenderId: '661391591709',
  appId: '1:661391591709:web:acbb0141715061d38c79f4'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
