"use client"

export default function Page({ params }: { params: { slug: string } }) {
    console.log(params.slug);
    console.log("Hello")
    return <div>
        <div className="flex">
            <h1>Hello this is form id {params.slug}</h1>
        </div>
    </div>
  }