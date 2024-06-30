"use client"

import { signOut } from 'firebase/auth'
import { auth } from './app';

export function sign_out() {
    signOut(auth).then(() => {
        // Sign-out successful.
        alert("signed out")
      }).catch((error) => {
        // An error happened.
        alert("error signing out")
      });
};
