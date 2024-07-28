import { app } from "@/lib/firebase/app";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";

export interface ResponseFormat {
    userId: string;
    submissionDate: string;
}

export default async function read_form_responses(formId: string): Promise<{ [key: string]: ResponseFormat } | null> {
    const db = getDatabase(app);
    const formResponsesRef = ref(db, `responses/${formId}`);
    try {
        const snapshot = await get(formResponsesRef);
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
