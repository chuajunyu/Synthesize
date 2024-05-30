import React from 'react';
import Block1 from "@/components/Block1";

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen">
        <div className="flex-grow flex-col justify-center ml-20 mt-5 mr-20">
            <span className="flex mt-3 mb-3 text-xl font-semibold">Welcome to Synthesize, Shelia</span>
            <div className="flex flex-row gap-x-4 mb-8">
                <Block1 />
                <Block1 />
            </div>
            <Block1 />
        </div>
    </div>
    );
}