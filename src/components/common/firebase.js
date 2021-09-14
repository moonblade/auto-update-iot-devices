import config from "./config";
import firebase from "firebase";

firebase.initializeApp(config.firebaseConfig);

export const storage = firebase.storage();
