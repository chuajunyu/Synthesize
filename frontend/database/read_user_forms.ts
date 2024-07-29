import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get } from "firebase/database";

export interface MyFormData {
    formId: string;
    createdDate: string;
    title: string;
}

export async function readUserForms(projectId: string): Promise<{ [key: string]: MyFormData } | null> {
    const db = getDatabase(app);
    const projectRef = ref(db, `projects/${projectId}/formIds`);
    
    try {
        const snapshot = await get(projectRef);
        if (snapshot.exists()) {
          const formIdsObject = snapshot.val();
            const formData: { [key: string]: MyFormData } = {};
            for (let i = 0; i < formIdsObject.length; i++) {
                if (formIdsObject[i] != null) {
                    const formRef = ref(db, `forms/${formIdsObject[i]}`);
                    const formSnapshot = await get(formRef);

                    if (formSnapshot.exists()) {
                        formData[formIdsObject[i]] = formSnapshot.val();
                    }
                }
            }
          return formData;
        } else {
            console.log('No forms found for this project');
            return null;
        }
    } catch (error) {
        console.error('Error fetching form data for this project:', error);
        return null;
    }
}
