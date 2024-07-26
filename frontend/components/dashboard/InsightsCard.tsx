import { Separator } from "@/components/ui/separator";

interface InsightsCardProps {
    newStatus: boolean;
    openStatus: boolean;
    actionable: string;
    lastUpdated: number;
    mentions: number;
}

function NewStatusCard() {
    return (
        <div className="2xl:w-2/5 w-3/4 px-2 py-1 text-center text-xs rounded-full bg-blue-400 shadow-md text-white font-bold my-2">
            New!
        </div>
    );
}

function OpenStatusCard() {
    return (
        <div className="2xl:w-2/5 w-3/4 px-2 py-1 text-center text-xs rounded-full bg-green-400 shadow-md text-slate-700 font-bold my-2">
            Open
        </div>
    );
}

function DoneStatusCard() {
    return (
        <div className="2xl:w-2/5 w-3/4 px-2 py-1 text-center text-xs rounded-full bg-violet-500 shadow-md text-white font-bold my-2">
            Done
        </div>
    );
}

function InsightsCard({
    newStatus,
    openStatus,
    actionable,
    lastUpdated,
    mentions,
}: InsightsCardProps) {

    // Convert lastUpdated from unix to human readable format
    const date = new Date(lastUpdated * 1000);

    return (
        <div className="flex flex-row justify-evenly items-center h-20 hover:bg-slate-200 focus:bg-slate-200">
            <div className="2xl:flex 2xl:flex-row 2xl:gap-x-2 text-slate-500 pr-3 flex-shrink-0 w-1/6">
                {newStatus ? <NewStatusCard /> : null}
                {openStatus ? <OpenStatusCard /> : <DoneStatusCard />}
            </div>
            <Separator orientation="vertical" className="bg-inherit" />
            <div className="text-base text-slate-700 px-3 flex-grow">
                {actionable}
            </div>
            <Separator orientation="vertical" className="bg-inherit" />
            <div className="text-base text-slate-700 px-3 flex-shrink-0 w-1/6">
                {date.toLocaleDateString()}
            </div>
            <Separator orientation="vertical" className="bg-inherit" />
            <div className="text-base text-slate-700 px-3 flex-shrink-0 w-1/6">
                {mentions}
            </div>
        </div>
    );
}

export default InsightsCard;
