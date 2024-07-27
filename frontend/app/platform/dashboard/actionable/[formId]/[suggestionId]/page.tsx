import SuggestionPage from "@/components/suggestion/SuggestionPage";

export default async function ActionablePage({
    params,
}: {
    params: { formId: string, suggestionId: string };
}) {
    return (
        <div>
            <SuggestionPage formId={params.formId} suggestionId={params.suggestionId} />
        </div>
    )
}
