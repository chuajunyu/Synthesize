import { getDatabase, ref, get } from 'firebase/database';
import { app } from '@/lib/firebase/app';

interface AnalysisStatistics {
    businessSentimentScore: number;
    totalActionableInsights: number;
    totalPositiveSentiments: number;
    totalNegativeSentiments: number;
    totalFormResponses: number;
}

export default async function readAnalysisStatistics(formId: string): Promise< AnalysisStatistics | null> {
    const db = getDatabase(app);
    const statisticsRef = ref(db, `analysis/${formId}/statistics`);

    try {
        const snapshot = await get(statisticsRef);
        if (snapshot.exists()) {
            const statistics = snapshot.val();
            return statistics;
        } else {
            console.log('No statistics found with this id');
            return null;
        }
    } catch (error) {
        console.error('Error reading statistics data:', error);
        return null;
    }
}
