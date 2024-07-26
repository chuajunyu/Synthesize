import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const RED = "#b91c1c";
const GREEN = "#15803d";
const GRAY = "#71717a";

interface ChangeCardProps {
    change: number;
}

function RedDownArrowCard({ change }: ChangeCardProps) {
    return (
        <div
            className={`h-full flex flex-row gap-x-1 items-center rounded-full bg-red-200 pl-2 pr-3`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke={RED}
                className="size-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
            </svg>

            <CardTitle className={`text-lg text-bold text-red-700`}>
                {change}
            </CardTitle>
        </div>
    );
}

function GreenDownArrowCard({ change }: ChangeCardProps) {
    return (
        <div
            className={`h-full flex flex-row gap-x-1 items-center rounded-full bg-green-200 pl-2 pr-3`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke={GREEN}
                className="size-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
            </svg>

            <CardTitle className={`text-lg text-bold text-green-700`}>
                {change}
            </CardTitle>
        </div>
    );
}

function GreenUpArrowCard({ change }: ChangeCardProps) {
    return (
        <div
            className={`h-full flex flex-row gap-x-1 items-center rounded-full bg-green-200 pl-2 pr-3`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke={GREEN}
                className="size-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
            </svg>
            <CardTitle className={`text-lg text-bold text-green-700`}>
                {change}
            </CardTitle>
        </div>
    );
}

function RedUpArrowCard({ change }: ChangeCardProps) {
    return (
        <div
            className={`h-full flex flex-row gap-x-1 items-center rounded-full bg-red-200 pl-2 pr-3`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke={RED}
                className="size-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
            </svg>
            <CardTitle className={`text-lg text-bold text-red-700`}>
                {change}
            </CardTitle>
        </div>
    );
}

function noChangeCard() {
    return (
        <div
            className={`h-full flex flex-row gap-x-1 items-center rounded-full bg-zinc-300 pl-2 pr-3`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke={GRAY}
                className="size-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
            </svg>
            <CardTitle className={`text-lg text-bold text-zinc-500`}>
                0
            </CardTitle>
        </div>
    );
}

interface StatisticsCardProps {
    title: string;
    value: string;
    change: number;
    bottomText: string;
    oppositeColor?: boolean;
}

function StatisticsCard(props: StatisticsCardProps) {
    const { title, value, change, bottomText, oppositeColor } = props;

    return (
        <Card className="shadow-md flex-1 border pb-0 rounded-xl">
            <CardHeader className="pt-2 pb-3">
                <CardTitle className="text-sm text-slate-500 text-left">
                    {title}
                </CardTitle>
                <div className="flex flex-row justify-between items-center pt-0">
                    <CardDescription className="text-black font-semibold text-4xl 2xl:text-4xl">
                        {value}
                    </CardDescription>
                    {change == 0 ? (
                        noChangeCard()
                    ) : change > 0 ? (
                        oppositeColor ? (
                            <RedUpArrowCard change={change} />
                        ) : (
                            <GreenUpArrowCard change={change} />
                        )
                    ) : oppositeColor ? (
                        <GreenDownArrowCard change={change * -1} />
                    ) : (
                        <RedDownArrowCard change={change * -1} />
                    )}
                </div>
                <CardTitle className="text-xs text-slate-400 text-left">
                    {bottomText}
                </CardTitle>
            </CardHeader>
        </Card>
    );
}

export default StatisticsCard;
