import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { authDomain } from "@/config";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDqvjhveu0G4NARsIFaxjljVoRwEXfzNMA",
  authDomain: authDomain,  // Edit the NODE_ENV in .env to change the authDomain
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
