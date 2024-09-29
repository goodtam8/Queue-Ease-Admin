   // Import the functions you need from the SDKs you need
   import { initializeApp } from "firebase/app";
   import { getStorage } from "firebase/storage"; // Import storage from the modular SDK

   // Your web app's Firebase configuration
   const firebaseConfig = {
     apiKey: "AIzaSyAQ4GQUq5S9DaL2dP59NRRuLo3dVLUcOz8",
     authDomain: "fyp-5a65b.firebaseapp.com",
     projectId: "fyp-5a65b",
     storageBucket: "fyp-5a65b.appspot.com",
     messagingSenderId: "645868515024",
     appId: "1:645868515024:web:3ba64b4a52c61090c9b8d5",
     measurementId: "G-FQ9GDK9DCX"
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const storage = getStorage(app); // Use getStorage to access storage

   export default storage;
