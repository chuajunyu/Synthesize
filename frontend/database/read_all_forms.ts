import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get } from "firebase/database";

export default async function read_all_form_data() {
    const db = getDatabase(app);
    const formRef = ref(db, 'forms/');
    try {
        const snapshot = await get(formRef);
        if (snapshot.exists()) {
            const allFormsData = snapshot.val();
            return allFormsData;
        } else {
            console.log('No form found with this id');
            return null;
        }
    } catch (error) {
        console.error('Error reading form data:', error);
        return null;
    }
}