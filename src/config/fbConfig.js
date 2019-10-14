import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let config;
if (process.env.NODE_ENV === 'development') {
   config = {
    apiKey: "AIzaSyCVTCzgxR2mBrnNvnHekRTN1qKMe8Ui428",
    authDomain: "firestore-local-test.firebaseapp.com",
    databaseURL: "https://firestore-local-test.firebaseio.com",
    projectId: "firestore-local-test",
    storageBucket: "firestore-local-test.appspot.com",
    messagingSenderId: "154221457694",
    appId: "1:154221457694:web:a987f2f8b9dd7fc278990f"
  };
} else if (process.env.NODE_ENV === 'production') {
  config = {
    apiKey: "AIzaSyBpO0wG_I2qA5kAkyMlzGCzvSbzpI_m8ko",
    authDomain: "gender-equality-4bdf6.firebaseapp.com",
    databaseURL: "https://gender-equality-4bdf6.firebaseio.com",
    projectId: "gender-equality-4bdf6",
    storageBucket: "gender-equality-4bdf6.appspot.com",
    messagingSenderId: "1078576149418",
    appId: "1:1078576149418:web:4377ee8704504599"
  };
}

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
