import { app } from "@/lib/firebase/app";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";

interface ResponseFormat {
  userId: string;
  submissionDate: string;
}

interface ChatHistory {
    createdDate: string;
    creatorId: string;
}

export default async function read_aiForm_responses(
  formId: string
): Promise<{ [key: string]: ResponseFormat } | null> {
  const db = getDatabase(app);
  const formResponsesRef = ref(db, `forms/${formId}/chat`);
  try {
    const snapshot = await get(formResponsesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const formattedData: { [key: string]: ResponseFormat } = {};
      Object.keys(data).forEach((key) => {
        const item = data[key] as ChatHistory;
        formattedData[key] = {
          userId: item.creatorId,
          submissionDate: item.createdDate,
        };
      });
      return formattedData;
    } else {
      console.log("No responses found for this user");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user responses:", error);
    return null;
  }
}
