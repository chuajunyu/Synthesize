import { app } from "@/lib/firebase/app";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";

export interface MyFormData {
    formId: string;
    createdDate: string;
    title: string;
}

export async function readUserForms(userId: string): Promise<{ [key: string]: MyFormData } | null> {
    const db = getDatabase(app);
    const formsRef = ref(db, 'forms');
    const userFormsQuery = query(formsRef, orderByChild('creatorId'), equalTo(userId));
    try {
        const snapshot = await get(userFormsQuery);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No responses found for this user');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user responses:', error);
        return null;
    }
}
