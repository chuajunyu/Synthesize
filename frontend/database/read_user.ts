import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";

export default function readUserData(email: string) {
    const db = getDatabase(app);
    const userRef= ref(db, 'users/');
    const userQuery = query(userRef, orderByChild('email'), equalTo(email));

    get(userQuery).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((userSnapshot) => {
            const userData = userSnapshot.val();
            });
        } else {
            console.log('No user found with this email');
        }
        }).catch((error) => {
            console.error('Error querying user data:', error);
        });
}
