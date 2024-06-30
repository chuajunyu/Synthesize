import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get } from "firebase/database";

interface Question {
    type: string;
    text: string;
}

export interface FormProps {
    title: string;
    description: string;
    questions: Question[];
    createdDate: number;
    creatorId: string;
}

export default async function readFormData(formId: string): Promise<FormProps | null> {
    const db = getDatabase(app);
    const formRef = ref(db, 'forms/' + formId);
    try {
        const snapshot = await get(formRef);
        if (snapshot.exists()) {
            const formData = snapshot.val();
            return formData;
        } else {
            console.log('No form found with this id');
            return null;
        }
    } catch (error) {
        console.error('Error reading form data:', error);
        return null;
    }
}