export interface ActionablesProps {
    Actionable: string;
    Rationale: string
}

export default function Actionables(props: ActionablesProps) {
    return (
        <div className="mt-1">
            <div className="text-lg font-semibold text-gray-800">{props.Actionable}</div>
            <div className="text-lg font-semibold text-gray-800">{props.Rationale}</div>
        </div>
    );
}
