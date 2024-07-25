"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { getFormTitles } from "@/database/read_form_titles";
import { Form } from "@/database/read_form_titles";
import { SECRET_KEY } from "@/config";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import ActionableInsightsTable from "@/components/dashboard/ActionableInsightsTable";
import SentimentsTable from "@/components/dashboard/SentimentsTable";
import SelectFormDropdown from "@/components/dashboard/SelectFormDropdown";

const dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const { user } = useAuth();
    const [analysisResponse, setAnalysisResponse] = useState<any>(null);
    const [formData, setFormData] = useState<Form[]>([]);
    const [externalId, setExternalId] = useState<string | null>(null);

    useEffect(() => {
        const fetchTitles = async () => {
            const forms = await getFormTitles();

            if (forms) {
                setFormData(forms);
            }
        };

        fetchTitles();
    }, []);

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
        if (externalId != null) {
            fetchAnalysisResponseData();
        }
    }, [externalId]);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                        value={"10"}
                                        change={1}
                                        bottomText="Generated with AI"
                                    />
                                    <StatisticsCard
                                        title="Total Positive Sentiments"
                                        value={"3"}
                                        change={3}
                                        bottomText=""
                                    />
                                    <StatisticsCard
                                        title="Total Negative Sentiments"
                                        value={"3"}
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
