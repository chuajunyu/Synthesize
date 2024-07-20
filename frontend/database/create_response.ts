import { app } from "@/lib/firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

export default function create_response(userId: string, formId: string, responses: Array<{responseId: number, response: string}>): string {
    const db = getDatabase(app);
    const responsesFormIdRef = ref(db, 'responses/' + formId);
    const newResponsesFormIdRef = push(responsesFormIdRef);
    const key = newResponsesFormIdRef.key ?? '';
    set(newResponsesFormIdRef, {
        answers: responses,
        submissionDate: Date.now(),
        userId: userId,
        processed: false,
        viewed: false
    });
    return key;
}