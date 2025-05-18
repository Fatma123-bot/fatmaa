// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCpHXsI_YQy6Vp3u0U-amHN8zonlGHsKw0",
  authDomain: "suso-9dff1.firebaseapp.com",
  databaseURL: "https://suso-9dff1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "suso-9dff1",
  storageBucket: "suso-9dff1.appspot.com",
  messagingSenderId: "815509994690",
  appId: "1:815509994690:web:462f36d70ebefac7328f5b",
  measurementId: "G-VHW4QRCCG3",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);   
const firestore = getFirestore(app);    

export { database, firestore }; 


