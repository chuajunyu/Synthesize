import { app } from "@/lib/firebase/app";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";

export interface Form {
    id: string,
    title: string
}
export async function getFormTitles(): Promise<Form[] | null> {
    const db = getDatabase(app);
    const formRef = ref(db, `forms`);
    try {
        const snapshot = await get(formRef);
        if (snapshot.exists()) {
            const formsData = snapshot.val();
            const titles: Form[] = Object.keys(formsData).map(formId => ({
                id: formId, 
                title: formsData[formId].title
            }));
            console.log(Array.isArray(titles));
            return titles;
        } else {
            console.log('No responses found for this user');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user responses:', error);
        return null;
    }
}
