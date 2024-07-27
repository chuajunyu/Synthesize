import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get } from "firebase/database";

interface Answer {
    response: string;
}

interface ResponseDataProps {
    answers: Answer[];
    submissionDate: number;
    userId: string;
}

export default async function readResponseData(
    formId: string,
    responseId: string
): Promise<ResponseDataProps | null> {
    const db = getDatabase(app);
    const responseRef = ref(db, `responses/${formId}/${responseId}`);
    try {
        const snapshot = await get(responseRef);
        if (snapshot.exists()) {
            const responseData = snapshot.val();
            return responseData;
        } else {
            console.log("No response found with this id");
            return null;
        }
    } catch (error) {
        console.error("Error reading response data:", error);
        return null;
    }
}
