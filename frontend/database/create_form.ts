import { app } from "@/lib/firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

export default function create_form(email: string, title: string, description: string, questions: Array<{text: string}>): string {
    const db = getDatabase(app);
    const formsRef = ref(db, 'forms');
    const newFormsRef = push(formsRef);
    const key = newFormsRef.key ?? '';
    set(newFormsRef, {
      createdDate: Date.now(),
      creatorId: email,
      title: title,
      description: description,
      questions: questions,
    }).then(() => {
        console.log("Form created successfully");
      })
      .catch((error) => {
        console.error("Error creating form: ", error);
      });
    return key;
}