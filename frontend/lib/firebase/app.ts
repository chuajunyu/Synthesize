import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDqvjhveu0G4NARsIFaxjljVoRwEXfzNMA",
  // authDomain: "synthesize-dev.firebaseapp.com",
  authDomain: "https://synthesize-git-develop-jun-yus-projects.vercel.app",
  databaseURL: "https://synthesize-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "synthesize-dev",
  storageBucket: "synthesize-dev.appspot.com",
  messagingSenderId: "362521595043",
  appId: "1:362521595043:web:bf775d12ee6df091ac8316",
  measurementId: "G-56DKZ32M6G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
