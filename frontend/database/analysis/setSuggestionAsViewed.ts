import { getDatabase, ref, update } from 'firebase/database';
import { app } from '@/lib/firebase/app';

async function setSuggestionAsViewed(formId: string, suggestionId: string) {
    const db = getDatabase(app);
    const suggestionRef = ref(db, `analysis/${formId}/insights/AGGREGATED_SUGGESTIONS/${suggestionId}`);
    try {
        await update(suggestionRef, {
            viewed: true,
        });
        console.log('Suggestion marked as viewed');
    } catch (error) {
        console.error('Error marking suggestion as viewed:', error);
    }
}

export default setSuggestionAsViewed;