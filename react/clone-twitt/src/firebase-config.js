import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC2bls1m-nIKRTJCGjehjr_N2-va2_d2bo',
  authDomain: 'cl-twitter.firebaseapp.com',
  projectId: 'cl-twitter',
  storageBucket: 'cl-twitter.appspot.com',
  messagingSenderId: '239000981202',
  appId: '1:239000981202:web:cf34420e823ea70a20670b',
};

export default firebase.initializeApp(firebaseConfig);
