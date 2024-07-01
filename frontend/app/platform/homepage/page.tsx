"use client"

import React from 'react';
import Block1 from "@/components/Block1";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {useAuth} from "@/lib/firebase/AuthContext";

export default function DashboardPage() {
    const {user} = useAuth();
    const name = user?.displayName;
    
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen">
                <div className="flex-grow flex-col mx-8 justify-center mt-5">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        Welcome to Synthesize, {name}
                    </span>
                    <div className="flex flex-row gap-x-4 mb-6">
                        <Block1 title="Create Your Feedback Forms" 
                        text="Effortlessly design custom feedback forms using our intuitive Form Builder. Add questions, edit them as needed, and share the form with your target audience through a simple link. Get started quickly and ensure you gather the precise feedback you need to improve your business, event, or product."
                        showButton={true} 
                        buttonText="Create a New Form"
                        href="/platform/form"/>
                        <Block1 
                        title="Analyze Feedback with AI" 
                        text="Harness the power of AI to analyze your feedback data. Our platform automatically generates actionable insights from user responses, helping you identify key areas for improvement. View aggregated summaries, common complaints, and actionable suggestions on your personalized dashboard, all in one place."
                        showButton={true}
                        buttonText="View Insight Dashboard"
                        href="dashboard"/>
                    </div>
                        <Block1 
                        title="Gather Feedback from Multiple Sources" 
                        text="Expand your feedback collection with ease. In addition to traditional forms, utilize AI-driven forms that ask follow-up questions, web-scraping for social media mentions, and even audio-to-text capabilities for live interviews. Our platform consolidates all feedback avenues, providing a comprehensive view of user opinions and experiences."
                        showButton={false}
                        buttonText="no text"
                        href="no href"/>
                </div>
            </div>
        </ProtectedRoute>
    );
}
