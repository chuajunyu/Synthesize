import { getDatabase, ref, update } from 'firebase/database';
import { app } from '@/lib/firebase/app';

async function setSuggestionAsOpen(formId: string, suggestionId: string) {
    const db = getDatabase(app);
    const suggestionRef = ref(db, `analysis/${formId}/insights/AGGREGATED_SUGGESTIONS/${suggestionId}`);
    try {
        await update(suggestionRef, {
            open: true,
        });
        console.log('Suggestion marked as open');
    } catch (error) {
        console.error('Error marking suggestion as open:', error);
    }
}

export default setSuggestionAsOpen;