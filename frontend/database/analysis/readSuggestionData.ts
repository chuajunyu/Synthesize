import { app } from "@/lib/firebase/app";
import { getDatabase, ref, get } from "firebase/database";

interface Suggestion {
    ACTIONABLE: string;
    LINKED_RESPONSES: string[];
    RATIONALE: string;
    lastUpdated: number;
    open: boolean;
    viewed: boolean;
}

export default async function readSuggestionData(formId: string, suggestionId: string): Promise< Suggestion | null> {
    const db = getDatabase(app);
    const suggestionRef = ref(db, `analysis/${formId}/insights/AGGREGATED_SUGGESTIONS/${suggestionId}`);

    try {
        const snapshot = await get(suggestionRef);
        if (snapshot.exists()) {
            const suggestionData = snapshot.val();
            return suggestionData;
        } else {
            console.log('No suggestion found with this id');
            return null;
        }
    } catch (error) {
        console.error('Error reading suggestion data:', error);
        return null;
    }
}
