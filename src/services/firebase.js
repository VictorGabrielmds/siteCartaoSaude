import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_HUuJYEFAGgUfj_ogWj3Mkx_2VwmuZqw",
  authDomain: "redecredenciada-5696f.firebaseapp.com",
  projectId: "redecredenciada-5696f",
  storageBucket: "redecredenciada-5696f.appspot.com",
  messagingSenderId: "612064719763",
  appId: "1:612064719763:web:a94e1cfd665a3763aa6e66",
  measurementId: "G-25PY0QEZTS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;