import { Separator } from "@/components/ui/separator";

interface SentimentCardProps {
    sentiment: string;
    count: number;
}

function SentimentCard({sentiment, count}: SentimentCardProps) {
    return (
        <div className="flex flex-row justify-evenly items-center h-20 hover:bg-slate-200 focus:bg-slate-200">
            <div className="2xl:flex 2xl:flex-row 2xl:gap-x-2 text-slate-500 pr-3 flex-grow w-1/6">
                {sentiment}
            </div>
            <Separator orientation="vertical" className="bg-inherit" />
            <div className="text-base text-slate-700 px-3 flex-shrink-0 w-1/6">
                {count}
            </div>
        </div>
    );
}

export default SentimentCard;
