import { app } from "@/lib/firebase/app";
import { getDatabase, ref, remove } from "firebase/database";

export default async function delete_project(projectId: string): Promise<void> {
  const db = getDatabase(app);
  const formRef = ref(db, `projects/${projectId}`);

  remove(formRef).then(() => {
    console.log(`Form with ID ${projectId} has been deleted successfully.`);
  });
}
