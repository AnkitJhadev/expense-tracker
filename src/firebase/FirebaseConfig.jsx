// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeTfUFWlHTzRKCxr3Ak4xB6RLW1-rhBpA",
  authDomain: "react-auth-with-9cd6e.firebaseapp.com",
  projectId: "react-auth-with-9cd6e",
  storageBucket: "react-auth-with-9cd6e.appspot.com",
  messagingSenderId: "777336233781",
  appId: "1:777336233781:web:acc67a73161bdffbfeb67c"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app,auth};