import app from "./db_conn";
import { getDatabase, ref, set, push } from "firebase/database";

export default function create_form(email: string, title: string, description: string, questions: Array<{text: string, type: string}>) {
    const db = getDatabase(app);
    const formsRef = ref(db, 'forms');
    const newFormsRef = push(formsRef);
    const key = newFormsRef.key;
    set(newFormsRef, {
        createdDate: Date.now(),
        creatorId: email,
        title: title,
        description: description,
        questions: questions,
    });
    return key;
}