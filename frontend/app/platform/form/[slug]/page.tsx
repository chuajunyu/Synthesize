"use client"
import ResponseForm from "@/components/ResponseForm";

export default function Page({ params }: { params: { slug: string } }) {
    console.log(params.slug);
    console.log("Hello")
    return <div>
        <div className="flex">
            <h1>Hello this is form id {params.slug}</h1>
            <ResponseForm title="jy being mean" description="hehe" question={[{ id: 1, text: "grr" }, { id: 2, text: "" }]} />
        </div>
    </div>
}