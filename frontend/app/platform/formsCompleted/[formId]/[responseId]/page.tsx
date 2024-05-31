import readResponseData from "@/database/read_response";
import readFormData from "@/database/read_form";
import ViewResponsePage from "@/components/ViewResponsePage";

export default async function Page({ params }: { params: { formId: string, responseId: string } }) {
    const responseData = await readResponseData(params.formId, params.responseId);
    const formData = await readFormData(params.formId);
    console.log(responseData)
    console.log(formData)
    if (formData === null || responseData === null) {
        return <div>
            <h1>Form or response not found</h1>
        </div>
    } else {
        return <div>
            <div className="flex flex-col w-full mx-20">
                <h1>Hello this is form id {params.formId} and response id {params.responseId}</h1>
                <ViewResponsePage formData={formData} responseData={responseData}/>
            </div>
        </div>
    }
}