import config from "./config";
import firebase from "firebase";

firebase.initializeApp(config.firebaseConfig);

export const storage = firebase.storage();
export const database = firebase.database();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

