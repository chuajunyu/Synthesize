import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import InsightsCard from "@/components/dashboard/InsightsCard";

interface Suggestion {
    ACTIONABLE: string;
    RATIONALE: string;
    LINKED_RESPONSES: string[];
    open: boolean;
    viewed: boolean;
}

interface ActionableInsightsTableProps {
    suggestionsData: Record<string, Suggestion>;
}

function ActionableInsightsTable({
    suggestionsData,
}: ActionableInsightsTableProps) {
    console.log(suggestionsData, "hi");
    return (
        <div className="flex flex-row w-full items-stretch space-x-6 mt-4 rounded-xl shadow-lg">
            <Card className="flex-grow w-4/5">
                <CardHeader className="pb-3">
                    <CardTitle className="pb-2">Actionable Insights</CardTitle>
                    <div className="flex flex-row justify-evenly items-center h-4">
                        <div className="text-xs text-slate-500 pr-3 flex-shrink-0 w-1/6">
                            Status
                        </div>
                        <Separator
                            orientation="vertical"
                            className="bg-slate-400"
                        />
                        <div className="text-xs text-slate-500 px-3 flex-grow">
                            Actionable Insight Content
                        </div>
                        <Separator
                            orientation="vertical"
                            className="bg-slate-400"
                        />
                        <div className="text-xs text-slate-500 px-3 flex-shrink-0 w-1/6">
                            Last Updated
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
                    <ScrollArea className="h-96 2xl:h-[600px]">
                        <CardDescription className="flex flex-col text-base leading-relaxed">
                            {suggestionsData === undefined ||
                            suggestionsData === null ? (
                                <div className="flex w-full h-full justify-center items-center">
                                    <div className="p-10">
                                        Loading... or maybe you don't have
                                        responses.
                                    </div>
                                </div>
                            ) : (
                                (
                                    Object.values(
                                        suggestionsData || {}
                                    ) as Suggestion[]
                                ).map(
                                    (suggestion: Suggestion, index: number) => (
                                        <div key={index}>
                                            <InsightsCard
                                                newStatus={!suggestion.viewed}
                                                openStatus={suggestion.open}
                                                actionable={
                                                    suggestion.ACTIONABLE
                                                }
                                                lastUpdated={1626864000}
                                                mentions={
                                                    suggestion.LINKED_RESPONSES
                                                        .length
                                                }
                                            />
                                            <Separator />
                                        </div>
                                    )
                                )
                            )}
                        </CardDescription>
                    </ScrollArea>
                </CardHeader>
            </Card>
        </div>
    );
}

export default ActionableInsightsTable;
