import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = require('./firebaseConfig.json');

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, firebase };
