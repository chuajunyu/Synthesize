import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get } from "firebase/database";

export interface ProjectProps {
    createdDate: string;
    description: string;
    goals: string;
    title: string;
}

export default async function read_project_data(projectId: string): Promise<ProjectProps | null> {
    const db = getDatabase(app);
    const projectRef = ref(db, "projects/" + projectId);
    try {
      const snapshot = await get(projectRef);
      if (snapshot.exists()) {
        const projectData = snapshot.val();
        return projectData;
      } else {
        console.log("No form found with this id");
        return null;
      }
    } catch (error) {
      console.error("Error reading form data:", error);
      return null;
    }
}