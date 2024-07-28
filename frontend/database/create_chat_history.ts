import { app } from "@/lib/firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import { MessageProps } from "@/app/platform/(withoutNavbar)/chat/[projectId]/[formId]/page";

export default function create_chat_history(
  userId: string,
  formId: string,
  chatHistory: MessageProps[]
) {
  const db = getDatabase(app);
  const chatRef = ref(db, `forms/${formId}/chat`);
  const newProjectRef = push(chatRef);
  set(newProjectRef, {
    createdDate: Date.now(),
    creatorId: userId,
    chatHistory: chatHistory
  });
  console.log("default project created");
}
