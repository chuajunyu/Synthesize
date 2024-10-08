import ResponseForm from "@/components/ResponseForm";
import read_form_data from "@/database/read_form";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default async function Page({
    params,
}: {
    params: { slug: string };
}) {
    const formData = await read_form_data(params.slug);
    if (formData === null) {
        return (
            <div>
                <h1>Form not found</h1>
            </div>
        );
    }
    const { description, questions, title } = formData;
    
    return (
        <ProtectedRoute>
            <div>
                <div className="flex flex-col">
                    <ResponseForm
                        title={title}
                        description={description}
                        questions={questions}
                        formId={params.slug}
                    />
                </div>
            </div>
        </ProtectedRoute>
    );
};
