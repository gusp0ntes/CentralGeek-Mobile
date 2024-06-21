import { initializeApp } from 'firebase/app';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyBwcLJ7NH3Xb6GrLPZlTs0OjKpae4OwCMs",
    authDomain: "central-geek.firebaseapp.com",
    projectId: "central-geek",
    storageBucket: "central-geek.appspot.com",
    messagingSenderId: "720899530950",
    appId: "1:720899530950:web:3f7eea050797d280db37c7",
    measurementId: "G-0PGNX3EJCJ"
  }
};

const firebaseApp = initializeApp(environment.firebaseConfig);

export default firebaseApp;