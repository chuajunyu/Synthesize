import readResponseData from "@/database/read_response";
import readFormData from "@/database/read_form";
import ViewResponsePage from "@/components/ViewResponsePage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default async function Page({
    params,
}: {
    params: { formId: string; responseId: string };
}) {
    const responseData = await readResponseData(
        params.formId,
        params.responseId
    );
    const formData = await readFormData(params.formId);
    console.log(responseData);
    console.log(formData);
    if (formData === null || responseData === null) {
        return (
            <ProtectedRoute>
                <div>
                    <h1>Form or response not found</h1>
                </div>
            </ProtectedRoute>
        );
    } else {
        return (
            <ProtectedRoute>
                <div>
                    <div className="flex items-center justify-center">
                        <ViewResponsePage
                            formData={formData}
                            responseData={responseData}
                        />
                    </div>
                </div>
            </ProtectedRoute>
        );
    }
}
