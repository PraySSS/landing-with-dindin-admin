import Firebase from 'firebase/app';

const firebaseConfig2 = {
    apiKey: "AIzaSyDvOk7jsGRnzugNWMS18Mv6MjZP551LJY8",
    authDomain: "dindin-9akj.firebaseapp.com",
    databaseURL: "https://dindin-9akj-default-rtdb.firebaseio.com",
    projectId: "dindin-9akj",
    storageBucket: "dindin-9akj.appspot.com",
    messagingSenderId: "21296755312",
    appId: "1:21296755312:web:830517231c6bb6f0b33ab5",
  };

  const firebase=Firebase.initializeApp(firebaseConfig2, 'secondary');

  export default firebase;