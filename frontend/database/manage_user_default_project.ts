// src/lib/firebase/manageUserProjects.ts
import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get, set, push, orderByChild, query, equalTo } from "firebase/database";

const db = getDatabase(app);

export default async function manage_user_default_project(
  userId: string
): Promise<{ projectId: string; projectName: string }> {
  const defaultProjectName = "Default Project";
    const projectsRef = ref(db, "projects");
    
    console.log("UserID:", userId);


  // Query to find the default project for the current user
  const projectQuery = query(
    projectsRef,
    orderByChild("creatorId"),
    equalTo(userId)
  );
  const projectsSnapshot = await get(projectQuery);

  let defaultProjectId: string | null = null;

  // Check if a default project already exists
  projectsSnapshot.forEach((childSnapshot) => {
    const project = childSnapshot.val();
    if (project.name === defaultProjectName) {
      defaultProjectId = childSnapshot.key;
    }
  });

  if (!defaultProjectId) {
    // Create a new default project
    const newProjectRef = push(projectsRef);
    defaultProjectId = newProjectRef.key ?? "";
    await set(newProjectRef, {
      projectId: defaultProjectId,
      name: defaultProjectName,
      createdDate: Date.now(),
      creatorId: userId,
    });
    console.log("default project created");
  }

  return { projectId: defaultProjectId, projectName: defaultProjectName };
}