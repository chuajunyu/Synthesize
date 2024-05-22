import { NavigationBar } from "@/components/NavigationBar";
import React from 'react';
import Block1 from "@/components/Block1";

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen">
        <NavigationBar  />
        <div className="flex-grow flex-col justify-start ml-80 mt-5">
            <span className="flex mt-3 mb-3 text-xl font-semibold">Welcome to Synthesize, Shelia</span>
            <div className="flex flex-row gap-x-4 mr-8 mb-8">
                <Block1 />
                <Block1 />
            </div>
            <Block1 />
        </div>
    </div>
    );
}