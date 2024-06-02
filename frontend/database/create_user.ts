import app from "./db_conn";
import { getDatabase, ref, set, push } from "firebase/database";

export default function writeUserData(name: string, email: string) {
    const db = getDatabase(app);
    const usersRef = ref(db, 'users');
    const newUsersRef = push(usersRef);
    set(newUsersRef, {
        username: name,
        email: email
    });
}