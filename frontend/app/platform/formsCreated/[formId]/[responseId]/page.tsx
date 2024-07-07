import readResponseData from "@/database/read_response";
import ViewResponsePage from "@/components/ViewResponsePage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import read_form_data from "@/database/read_form";

export default async function Page({ params }: {
  params: { formId: string; responseId: string };
}) {
  const responseData = await readResponseData(params.formId, params.responseId);
  const formData = await read_form_data(params.formId);
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
        <div className="flex min-h-screen">
          <div className="justify-center w-full mx-8 mt-10">
            <ViewResponsePage formData={formData} responseData={responseData} />
          </div>
        </div>
      </ProtectedRoute>
    );
  }
}
