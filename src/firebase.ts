import  firebase  from 'firebase/compat/app';
import 'firebase/compat/firestore';

 

const firebaseConfig = {
    apiKey: "AIzaSyAXGgVHRbIXWwrLuI5_41cSpH67HOgtLwE",
    authDomain: "codeswot.firebaseapp.com",
    databaseURL: "https://codeswot-default-rtdb.firebaseio.com",
    projectId: "codeswot",
    storageBucket: "codeswot.appspot.com",
    messagingSenderId: "886657193194",
    appId: "1:886657193194:web:c5753e0ee5264db0d33393"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



export default db;
