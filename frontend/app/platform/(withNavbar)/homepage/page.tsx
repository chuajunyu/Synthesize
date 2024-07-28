"use client";

import React from "react";
import Block1 from "@/components/Block1";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/firebase/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const name = user?.displayName;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <div className="flex-grow flex-col mx-8 justify-center mt-5">
          <span className="flex mt-3 mb-3 text-xl font-semibold">
            Welcome to Synthesize, {name}
          </span>
          <div className="flex flex-row gap-x-4 mb-6">
            <Block1
              title="Create Your Feedback Forms"
              text="Effortlessly design custom feedback forms using our intuitive Form Builder. Add questions, edit them as needed, and share the form with your target audience through a simple link. Get started quickly and ensure you gather the precise feedback you need to improve your business or research. 💪"
              showButton={true}
              buttonText="Create a New Form Manually"
              href="/platform/form"
            />
            <Block1
              title="Generate Forms with the Empowerment of AI 🤖"
              text="Introducing our AI-powered form-builder powered by OpenAI's
                  ChatGPT-4o. Simply provide your business context and goals,
                  and get ready to unveil deep and thorough insights beyond the
                  traditional means of any form! 🎉"
              showButton={true}
              buttonText="Generate an AI-powered Form"
              href="form/aiForm"
            />
          </div>
          <Block1
            title="Analyze Feedback with AI"
            text="Harness the power of AI to analyze your feedback data. Our platform automatically generates actionable insights from user responses, helping you identify key areas for improvement. View aggregated summaries, common complaints, and actionable suggestions on your personalized insight dashboard, all in one place. Simply send out the form link to respondants, then click on your project's insight dashboard and select that form to view your insights."
            showButton={false}
            buttonText="View Insight Dashboard"
            href="dashboard"
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
