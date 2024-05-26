import readFormData from "@/database/read_form";

export default await async function Page({ params }: { params: { slug: string } }) {
    const formData = await readFormData(params.slug);
    console.log(formData);
    return <div>
        <div className="flex">
            <h1>Hello this is form id {params.slug}</h1>
        </div>
    </div>
  }