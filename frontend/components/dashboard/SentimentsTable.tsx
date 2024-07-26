import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SentimentCard from "@/components/dashboard/SentimentCard";

interface Sentiment {
    positive_sentiment?: string;
    negative_sentiment?: string;
    count: number;
}

interface SentimentsTableProps {
    positiveSentiments: Record<string, Sentiment>;
    negativeSentiments: Record<string, Sentiment>;
}

function SentimentsTable({
    positiveSentiments,
    negativeSentiments,
}: SentimentsTableProps) {
    return (
        <div className="justify-center w-full mt-5">
            <Card className="flex-grow">
                <CardHeader className="pb-3">
                    <CardTitle>Positive Sentiments</CardTitle>
                    <div className="flex flex-row justify-evenly items-center h-4">
                        <div className="text-xs text-slate-500 pr-3 flex-grow">
                            Positive Sentiments Content
                        </div>
                        <Separator
                            orientation="vertical"
                            className="bg-slate-400"
                        />
                        <div className="text-xs text-slate-500 px-3 flex-shrink-0 w-1/6">
                            Mentions
                        </div>
                    </div>
                    <Separator />
                    <ScrollArea className="h-72 2xl:h-[500px]">
                        <CardDescription className="flex flex-col text-base leading-relaxed">
                            {positiveSentiments === undefined ||
                            positiveSentiments === null ? (
                                <div>Loading...</div>
                            ) : (
                                (
                                    Object.values(
                                        positiveSentiments || {}
                                    ) as Sentiment[]
                                ).map((sentiment: Sentiment, index: number) => (
                                    <SentimentCard
                                        key={index}
                                        sentiment={
                                            sentiment.positive_sentiment ?? ""
                                        }
                                        count={sentiment.count}
                                    />
                                ))
                            )}
                        </CardDescription>
                    </ScrollArea>
                </CardHeader>
            </Card>
            <Card className="flex-grow mt-5">
                <CardHeader className="pb-3">
                    <CardTitle>Negative Sentiments</CardTitle>
                    <div className="flex flex-row justify-evenly items-center h-4">
                        <div className="text-xs text-slate-500 pr-3 flex-grow">
                            Negative Sentiments Content
                        </div>
                        <Separator
                            orientation="vertical"
                            className="bg-slate-400"
                        />
                        <div className="text-xs text-slate-500 px-3 flex-shrink-0 w-1/6">
                            Mentions
                        </div>
                    </div>
                    <Separator />
                    <ScrollArea className="h-72 2xl:h-[500px]">
                        <CardDescription className="flex flex-col text-base leading-relaxed">
                            {negativeSentiments === undefined ||
                            negativeSentiments === null ? (
                                <div>Loading...</div>
                            ) : (
                                (
                                    Object.values(
                                        negativeSentiments || {}
                                    ) as Sentiment[]
                                ).map((sentiment: Sentiment, index: number) => (
                                    <SentimentCard
                                        key={index}
                                        sentiment={
                                            sentiment.negative_sentiment ?? ""
                                        }
                                        count={sentiment.count}
                                    />
                                ))
                            )}
                        </CardDescription>
                    </ScrollArea>
                </CardHeader>
            </Card>
        </div>
    );
}

export default SentimentsTable;
