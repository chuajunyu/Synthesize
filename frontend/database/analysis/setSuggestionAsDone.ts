import { getDatabase, ref, update } from 'firebase/database';
import { app } from '@/lib/firebase/app';

async function setSuggestionAsDone(formId: string, suggestionId: string) {
    const db = getDatabase(app);
    const suggestionRef = ref(db, `analysis/${formId}/insights/AGGREGATED_SUGGESTIONS/${suggestionId}`);
    try {
        await update(suggestionRef, {
            open: false,
        });
        console.log('Suggestion marked as done');
    } catch (error) {
        console.error('Error marking suggestion as done:', error);
    }
}

export default setSuggestionAsDone;