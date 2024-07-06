interface props {
    insight: string;
}


export default function Insights({ insight }: props) {
    return (
        <div className="mt-1">
            <div className="text-lg font-semibold text-gray-800">
                {insight}
            </div>
        </div>
    );
}
