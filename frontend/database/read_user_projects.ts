import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";

export interface ProjectTitle {
  title: string;
  projectId: string;
}

export default async function read_user_projects(
  userId: string
): Promise<ProjectTitle[] | null> {
  const db = getDatabase(app);
  const projectsRef = ref(db, "projects");
  const userProjectsQuery = query(
    projectsRef,
    orderByChild("creatorId"),
    equalTo(userId)
  );
  
  try {
      const snapshot = await get(userProjectsQuery);
      if (snapshot.exists()) {
        const projects = snapshot.val();
        return Object.keys(projects).map((key) => ({
            title: projects[key].title,
            projectId: key,
        }));
      } else {
        console.log("No projects found for this user");
        return null;
      }
  } catch (error) {
    console.error("Error fetching project responses:", error);
    return null;
  }
}