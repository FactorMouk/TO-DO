import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyAeAAAg4UUVH9NKMwwqXA2d1Uca1CbGXYo",
  authDomain: "to-dos-app-f1b05.firebaseapp.com",
  projectId: "to-dos-app-f1b05",
  storageBucket: "to-dos-app-f1b05.appspot.com",
  messagingSenderId: "641365083878",
  appId: "1:641365083878:web:ef0c3ce5f1dd487a6b9d27",
  measurementId: "G-BCC47MBB8W"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
