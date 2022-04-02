import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// 자신의 fireBase정보를 아래 ""에 등록하세요.
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

export default firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const autoService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = firebase.storage();
