import { app } from "@/lib/firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

export default function create_project(
  email: string,
  title: string,
  description: string,
  goals: string
) : Promise<void> {
  const db = getDatabase(app);
  const projectsRef = ref(db, "projects");
  const newprojectsRef = push(projectsRef);

  return set(newprojectsRef, {
    createdDate: Date.now(),
    creatorId: email,
    title: title,
    description: description,
    goals: goals,
  })
    .then(() => {
      console.log("Project created successfully in database");
    })
    .catch((error) => {
      console.error("Error creating form: ", error);
    });
}
