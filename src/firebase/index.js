import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAJhIhMUa2Zr0-V2S8nnAhCK-Ne1YGpHN4",
  authDomain: "balance-game-689aa.firebaseapp.com",
  projectId: "balance-game-689aa",
  storageBucket: "balance-game-689aa.appspot.com",
  messagingSenderId: "190870768632",
  appId: "1:190870768632:web:245d56b2f2b3cb617fa40d",
  measurementId: "G-JQVMG6H6MK"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();