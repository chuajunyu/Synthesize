"use client";

import { onAuthStateChanged } from "firebase/auth";
import auth from "./auth";

export default function getCurrentUser() {
    var currentUser = null;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
        } else {
            currentUser = null;
        }
    });

    return currentUser;
}
