import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./app";

async function signUpWithEmailAndPassword(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return "success";
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == "auth/weak-password") {
                return "Use a stronger password!"
            }
            if (errorCode == "auth/email-already-in-use") {
                return "This email is already in use. Log-in with that email instead. Or sign-up with another email.";
            }
            return errorCode;
        });
}

async function logInWithEmailAndPassword(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return "success";
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == "auth/invalid-credential") {
                return "Wrong email or password. Try again.";
            }

            return errorCode;
        });
}

export { signUpWithEmailAndPassword, logInWithEmailAndPassword };
