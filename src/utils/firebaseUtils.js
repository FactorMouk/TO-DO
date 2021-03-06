import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import { getFirebase } from "react-redux-firebase";
import { Store } from "../store";
import { createFirestoreInstance } from "redux-firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAeAAAg4UUVH9NKMwwqXA2d1Uca1CbGXYo",
  authDomain: "to-dos-app-f1b05.firebaseapp.com",
  projectId: "to-dos-app-f1b05",
  storageBucket: "to-dos-app-f1b05.appspot.com",
  messagingSenderId: "641365083878",
  appId: "1:641365083878:web:ef0c3ce5f1dd487a6b9d27",
  measurementId: "G-BCC47MBB8W",
});

firebase.firestore();

firebase
  .auth()
  .signInAnonymously()
  .then((user) => {
    if (
      !getFirebase()
        .firestore()
        .collection("tasks")
        .doc(user.user.uid)
        .get()
        .then((data) => {
          if (!data.exists) {
            getFirebase()
              .firestore()
              .collection("tasks")
              .doc(user.user.uid)
              .set({ pending: [], completed: [] });
          }
        })
    );
  });

const rrfConfig = {
  userProfile: "users",
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: Store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
