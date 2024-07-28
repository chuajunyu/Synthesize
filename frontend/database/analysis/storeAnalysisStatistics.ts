import { getDatabase, ref, update } from 'firebase/database';
import { app } from '@/lib/firebase/app';

interface AnalysisStatistics {
    businessSentimentScore: number;
    totalActionableInsights: number;
    totalPositiveSentiments: number;
    totalNegativeSentiments: number;
    totalFormResponses: number;
}

async function storeAnalysisStatistics(formId: string, analysisStatistics: AnalysisStatistics) {
    const db = getDatabase(app);
    const suggestionRef = ref(db, `analysis/${formId}`);
    try {
        await update(suggestionRef, {
            statistics: analysisStatistics,
        });
        console.log('Stored statistics');
    } catch (error) {
        console.error('Error storing statistics', error);
    }
}

export default storeAnalysisStatistics;