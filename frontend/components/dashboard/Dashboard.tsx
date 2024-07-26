"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { getFormTitles } from "@/database/read_form_titles";
import { MyFormData } from "@/database/read_user_forms";
import { SECRET_KEY } from "@/config";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import ActionableInsightsTable from "@/components/dashboard/ActionableInsightsTable";
import SentimentsTable from "@/components/dashboard/SentimentsTable";
import SelectFormDropdown from "@/components/dashboard/SelectFormDropdown";
import readResponseData from "@/database/read_response";
import readUserForms from "@/database/read_user_forms";
import read_form_responses from "@/database/read_form_responses";

interface FormTitle {
    id: string;
    title: string;
}

const dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const { user } = useAuth();
    const [analysisResponse, setAnalysisResponse] = useState<any>(null);
    const [formData, setFormData] = useState<FormTitle[]>([]);
    const [externalId, setExternalId] = useState<string | null>(null);
    const [formResponsesCount, setFormResponsesCount] = useState<number>(0);

    useEffect(() => {
        async function fetchData() {
            if (userEmail !== null) {
                const data = await readUserForms(userEmail);
                console.log(data)
                if (data) {
                    const formTitles = Object.keys(data).map((formId) => ({
                        id: formId,
                        title: data[formId].title
                    }))
                    setFormData(formTitles);
                }
                
                setLoading(false);
            }
        }
        fetchData();
    }, [userEmail]);

    useEffect(() => {
        async function authenticate() {
            const email = user?.email ?? "";
            setUserEmail(email);
        }
        authenticate();
    }, [user?.email]);

    useEffect(() => {
        async function fetchData() {
            if (userEmail !== null) {
                setLoading(false);
            }
        }
        fetchData();
    }, [userEmail]);

    useEffect(() => {
        console.log("fetching analysis response data");
        async function fetchAnalysisResponseData() {
            const apiEndpoint = `https://synthesize-wcnj.onrender.com/get_form_analysis/${externalId}?secret=${SECRET_KEY}`;
            fetch(apiEndpoint)
                .then((response) => {
                    // Check if the response status is OK (status code 200-299)
                    if (!response.ok) {
                        throw new Error(
                            "Network response was not ok " + response.statusText
                        );
                    }
                    if (response.status == 204) {
                        return "No Content";
                    }
                    // Parse the JSON data from the response
                    return response.json();
                })
                .then((data) => {
                    // Handle the parsed data
                    console.log(data, "test");
                    setAnalysisResponse(data["content"]);
                })
                .catch((error) => {
                    // Handle any errors that occurred during the fetch
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                });
        }

        async function fetchFormResponsesCount() {
            const formResponses = await read_form_responses(externalId ?? "")
            setFormResponsesCount(Object.keys(formResponses ?? {}).length)
        }

        if (externalId != null) {
            fetchAnalysisResponseData();
            fetchFormResponsesCount();
        }
    }, [externalId]);

    useEffect(() => {

    }, [userEmail]);

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(
        (
            Object.values(
                analysisResponse?.insights?.AGGREGATED_NEGATIVE || {}
            ) as any[]
        ).length.toString()
    );

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen">
                <div className="justify-center w-full mx-8 mt-5">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        (TODO: Project Name)
                    </span>
                    <div className="my-4">
                        <SelectFormDropdown
                            forms={formData}
                            setExternalId={setExternalId}
                        />
                    </div>
                    {externalId === null ? (
                        <div>Select a Form</div>
                    ) : (
                        <div>
                            <div className="flex flex-col">
                                <div className="flex flex-row w-full justify-between gap-x-8">
                                    <StatisticsCard
                                        title="Business Sentiment Score"
                                        value={"9.8"}
                                        change={0.3}
                                        bottomText="Out of 10"
                                    />
                                    <StatisticsCard
                                        title={"Total Actionable Insights"}
                                        value={(
                                            Object.values(
                                                analysisResponse?.insights
                                                    ?.AGGREGATED_SUGGESTIONS ||
                                                    {}
                                            ) as any[]
                                        ).length.toString()}
                                        change={1}
                                        bottomText="Generated with AI"
                                    />
                                    <StatisticsCard
                                        title="Total Positive Sentiments"
                                        value={(
                                            Object.values(
                                                analysisResponse?.insights
                                                    ?.AGGREGATED_POSITIVE || {}
                                            ) as any[]
                                        ).length.toString()}
                                        change={3}
                                        bottomText=""
                                    />
                                    <StatisticsCard
                                        title="Total Negative Sentiments"
                                        value={(
                                            Object.values(
                                                analysisResponse?.insights
                                                    ?.AGGREGATED_NEGATIVE || {}
                                            ) as any[]
                                        ).length.toString()}
                                        change={3}
                                        bottomText=""
                                        oppositeColor={true}
                                    />
                                    <StatisticsCard
                                        title={"Total Form Responses"}
                                        value={"23"}
                                        change={5}
                                        bottomText=""
                                    />
                                </div>
                            </div>
                            <ActionableInsightsTable
                                suggestionsData={
                                    analysisResponse?.insights
                                        ?.AGGREGATED_SUGGESTIONS
                                }
                            />
                            <SentimentsTable
                                negativeSentiments={
                                    analysisResponse?.insights
                                        ?.AGGREGATED_NEGATIVE
                                }
                                positiveSentiments={
                                    analysisResponse?.insights
                                        ?.AGGREGATED_POSITIVE
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default dashboard;
