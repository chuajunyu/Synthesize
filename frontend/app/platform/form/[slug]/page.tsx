import ResponseForm from "@/components/ResponseForm";
import readFormData from "@/database/read_form";


export default await async function Page({ params }: { params: { slug: string } }) {
    const formData = await readFormData(params.slug);
    const { createdDate, creatorId, description, questions, title } = formData;
    return <div>
        <div className="flex flex-col">
            <ResponseForm title={title} description={description} questions={questions} formId={params.slug}/>
        </div>
    </div>
}