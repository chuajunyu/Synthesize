import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import InsightsCard from "@/components/dashboard/InsightsCard";
import Link from "next/link";

interface Suggestion {
    ACTIONABLE: string;
    RATIONALE: string;
    LINKED_RESPONSES: string[];
    open: boolean;
    viewed: boolean;
    lastUpdated: number;
}

interface ActionableInsightsTableProps {
    suggestionsData: Record<string, Suggestion>;
    formId: string;
}

function ActionableInsightsTable({
    suggestionsData,
    formId,
}: ActionableInsightsTableProps) {

    function sortSuggestions(a: [string, Suggestion], b: [string, Suggestion]) {
        if (a[1].viewed == b[1].viewed) {
            if (a[1].open == b[1].open) {
                return b[1].lastUpdated - a[1].lastUpdated; // Bigger number will be at the top aka latest timestamp
            } else {
                return a[1].open ? -1 : 1;
            }
        } else {
            return a[1].viewed ? 1 : -1;
        }
    }

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
                                    Object.entries(suggestionsData || {}) as [
                                        string,
                                        Suggestion
                                    ][]
                                )
                                    .sort(sortSuggestions)
                                    .map(
                                        (
                                            suggestionObject: [
                                                string,
                                                Suggestion
                                            ],
                                            index: number
                                        ) => (
                                            <div key={index}>
                                                <Link
                                                    href={`dashboard/actionable/${formId}/${suggestionObject[0]}`}
                                                >
                                                    <InsightsCard
                                                        newStatus={
                                                            !suggestionObject[1]
                                                                .viewed
                                                        }
                                                        openStatus={
                                                            suggestionObject[1]
                                                                .open
                                                        }
                                                        actionable={
                                                            suggestionObject[1]
                                                                .ACTIONABLE
                                                        }
                                                        lastUpdated={
                                                            suggestionObject[1]
                                                                .lastUpdated
                                                        }
                                                        mentions={
                                                            suggestionObject[1]
                                                                .LINKED_RESPONSES
                                                                .length
                                                        }
                                                    />
                                                    <Separator />
                                                </Link>
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
