import SuggestionPage from "@/components/suggestion/SuggestionPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default async function ActionablePage({
    params,
}: {
    params: { formId: string; suggestionId: string };
}) {
    return (
        <div>
            <ProtectedRoute>
                <SuggestionPage
                    formId={params.formId}
                    suggestionId={params.suggestionId}
                />
            </ProtectedRoute>
        </div>
    );
}
