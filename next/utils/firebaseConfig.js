import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDZ9_qt0qDO6Q5cmZAXfzBOFR_zvzFVkDs",
    authDomain: "login-4671b.firebaseapp.com",
    projectId: "login-4671b",
    storageBucket: "login-4671b.appspot.com",
    messagingSenderId: "444397502635",
    appId: "1:444397502635:web:0c06be19770b2f1bf837ee"
};

const app = initializeApp(firebaseConfig);

export default firebaseConfig;
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
