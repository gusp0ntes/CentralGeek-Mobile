// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";


export const environment = {
  production: false,
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


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
