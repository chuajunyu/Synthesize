import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./app";

function signUpWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            // if (errorCode === "auth/email-already-in-use") {
            //     console.log("Email already in use");
            // }
            return errorCode
        });
}

function logInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            return "success"
        })
        .catch((error) => {
            const errorCode = error.code;
            // console.log(errorCode)
            // alert(errorCode)
            return errorCode
            // if (errorCode === "auth/invalid-credentials") {
            //     console.log("Wrong password");
            // }
        });
}

export { signUpWithEmailAndPassword, logInWithEmailAndPassword };
