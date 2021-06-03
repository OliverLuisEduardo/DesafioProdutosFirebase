import * as firebase from "firebase";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyBX-LYjonEGMPuwxrK8yCvoXjDF8KMOB6M",
  authDomain: "desafioprodutosfirebase.firebaseapp.com",
  databaseURL: "gs://desafioprodutosfirebase.appspot.com",
  projectId: "desafioprodutosfirebase",
  storageBucket: "desafioprodutosfirebase.appspot.com",
  messagingSenderId: "958729747323",
  appId: "1:958729747323:web:7e49413425aae7cd891bde"
};

firebase.initializeApp(config);

export default firebase.firestore();
