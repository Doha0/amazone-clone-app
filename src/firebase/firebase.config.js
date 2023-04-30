// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB39In5KC3Nb0JIK8MzgTAkUsBBPPhYRrw",
    authDomain: "e-clone-with-firebase.firebaseapp.com",
    projectId: "e-clone-with-firebase",
    storageBucket: "e-clone-with-firebase.appspot.com",
    messagingSenderId: "367576929848",
    appId: "1:367576929848:web:c78ea68cbcc8eca96678cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;