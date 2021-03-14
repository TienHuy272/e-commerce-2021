import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCWulI7hUwYLL5lZbSbpAMrxfoLKxUMpuM',
  authDomain: 'e-commerce-react-2021.firebaseapp.com',
  projectId: 'e-commerce-react-2021',
  storageBucket: 'e-commerce-react-2021.appspot.com',
  messagingSenderId: '338316475125',
  appId: '1:338316475125:web:7622c7b14994b734f1e3bc',
  measurementId: 'G-73MY64Z6VR',
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//trigger google popup
provider.setCustomParameters({ promt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
