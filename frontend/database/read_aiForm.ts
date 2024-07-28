import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { Form } from "@/lib/types";

export default async function read_aiForm(
  formId: string
): Promise<Form | null> {
  const db = getDatabase(app);
  const formRef = ref(db, "forms/" + formId);
  try {
    const snapshot = await get(formRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        return {
          title: data.title,
          description: data.description,
          questions: [], // AI forms might not have questions in the same way
          createdDate: data.createdDate,
          creatorId: data.creatorId,
          isAiForm: data.isAiForm,
          informationGoals: data.informationGoals,
          numberOfQuestions: data.numberOfQuestions,
        };
    } else {
      console.log("No form found with this id");
      return null;
    }
  } catch (error) {
    console.error("Error reading form data:", error);
    return null;
  }
}
