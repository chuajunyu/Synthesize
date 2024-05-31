import {
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
} from "firebase/auth";
import auth from "./app";
import { redirect } from "next/navigation";

const provider = new GoogleAuthProvider();

export default function signInWithGoogleRedirect() {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
        .then((result) => {
            if (result !== null) {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                console.log(user);

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
