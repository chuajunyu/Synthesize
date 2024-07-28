import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get } from "firebase/database";

export interface AiResponseDataProps {
  message: string;
  role: string;
  time: number;
}

export interface AiResponseData {
  createdDate: number;
  creatorId: string;
  chatHistory: AiResponseDataProps[];
}

export default async function readAIResponseData(
  formId: string,
  responseId: string
): Promise<AiResponseData | null> {
  const db = getDatabase(app);
  const responseRef = ref(db, `forms/${formId}/chat/${responseId}`);
  try {
    const snapshot = await get(responseRef);
    if (snapshot.exists()) {
      const responseData = snapshot.val();

      const { createdDate, creatorId, chatHistory } = responseData;
      const formattedChatHistory: AiResponseDataProps[] = Object.values(
        chatHistory
      ).map((item: any) => ({
        message: item.message,
        role: item.role,
        time: item.timestamp,
      }));

      return {
        createdDate: createdDate,
        creatorId: creatorId,
        chatHistory: formattedChatHistory,
      };
    } else {
      console.log("No response found with this id");
      return null;
    }
  } catch (error) {
    console.error("Error reading response data:", error);
    return null;
  }
}
