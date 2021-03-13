
import * as firebase from 'firebase';
//import {firebase} from '@firebase/app';
//require('@firebase/firestore')
import 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCC1tvkGZz1eModHqn0FRbkIlPXFWf4niU",
  authDomain: "wily-app-46b4b.firebaseapp.com",
  projectId: "wily-app-46b4b",
  storageBucket: "wily-app-46b4b.appspot.com",
  messagingSenderId: "249594975780",
  appId: "1:249594975780:web:c7a38e0b2630452a8e2ab1"
};
  // Initialize Firebase
  if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();