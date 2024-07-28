import { app } from "@/lib/firebase/app";
import { getDatabase, ref, set, push, get } from "firebase/database";

export default function create_form(email: string, title: string, description: string, questions: Array<{text: string}>, projectId: string): string {
    const db = getDatabase(app);
    const formsRef = ref(db, 'forms');
    const newFormsRef = push(formsRef);
  const key = newFormsRef.key ?? '';
  set(newFormsRef, {
    isAiForm: false,
    createdDate: Date.now(),
    creatorId: email,
    title: title,
    description: description,
    questions: questions,
  }).then(async () => {
    console.log("Hi Hi Form created successfully");

    try {
      const projectFormsRef = ref(db, `projects/${projectId}/formIds`);

      // Retrieve the current formIds if they exist
      const snapshot = await get(projectFormsRef);
      console.log(snapshot.val());
      let formIds = [];
      if (snapshot.exists()) {
        formIds = snapshot.val();
        if (!Array.isArray(formIds)) {
          formIds = Object.keys(formIds);
        }
      }

      // Add the new form ID
      formIds.push(key);
      console.log(formIds);

      // Update the formIds in the database
      set(projectFormsRef, formIds).then(() => {
        console.log("New Form successfully associated with project");
      });
    } catch (error) {
      console.error("Error fetching or updating form data:", error);
    }
  });
    return key;
}