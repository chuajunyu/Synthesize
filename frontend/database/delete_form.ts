import { app } from "@/lib/firebase/app";
import { getDatabase, ref, remove } from "firebase/database";

export async function delete_form(formId: string): Promise<void> {
  const db = getDatabase(app);
  const formRef = ref(db, `forms/${formId}`);

  remove(formRef).then(() => {
    console.log(`Form with ID ${formId} has been deleted successfully.`);
  });
}
