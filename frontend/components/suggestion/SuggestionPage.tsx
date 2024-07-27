"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import readSuggestionData from "@/database/analysis/readSuggestionData";
import read_form_data from "@/database/read_form";
import { useProject } from "@/contexts/ProjectContext";
import { useEffect, useState } from "react";
import { Suggestion, Form } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import read_form_responses, {
    ResponseFormat,
} from "@/database/read_form_responses";
import ResponsesTable, { ResponseData } from "@/components/ResponsesTable";
import { Button } from "@/components/ui/button";
import setSuggestionAsDone from "@/database/analysis/setSuggestionAsDone";
import setSuggestionAsOpen from "@/database/analysis/setSuggestionAsOpen";
import setSuggestionAsViewed from "@/database/analysis/setSuggestionAsViewed";

interface SuggestionProps {
    formId: string;
    suggestionId: string;
}

function SuggestionPage({ formId, suggestionId }: SuggestionProps) {
    const [loading, setLoading] = useState(true);
    const { selectedProject } = useProject();
    const [suggestionData, setSuggestionData] = useState<Suggestion | null>(
        null
    );
    const [formData, setFormData] = useState<Form | null>(null);
    const [responseData, setResponseData] = useState<{
        [key: string]: ResponseFormat;
    } | null>(null);

    useEffect(() => {
        async function setAsViewed() {
            if (!suggestionData?.viewed) {
                await setSuggestionAsViewed(formId, suggestionId);
            }
        }
        setAsViewed();

        async function getSuggestionData() {
            const suggestionData = await readSuggestionData(
                formId,
                suggestionId
            );
            setSuggestionData(suggestionData);
            setLoading(false);
        }
        getSuggestionData();

        async function getFormData() {
            const formData = await read_form_data(formId);
            setFormData(formData);
        }
        getFormData();
    }, [formId, suggestionId]);

    useEffect(() => {
        async function fetchResponseData() {
            try {
                const data = await read_form_responses(formId);
                if (data) {
                    const filteredData = Object.keys(data)
                        .filter((key) =>
                            suggestionData?.LINKED_RESPONSES.includes(key)
                        )
                        .reduce(
                            (newObj: { [key: string]: any }, key: string) => {
                                newObj[key] = data[key];
                                return newObj;
                            },
                            {}
                        );
                    setResponseData(filteredData);
                }
            } catch (error) {
                console.log("error found");
            }
        }
        fetchResponseData();
    }, [formId, suggestionData]);

    return suggestionData ? (
        <div className="flex flex-col mx-8 mt-5">
            <span className="flex mt-3 mb-3 text-xl font-semibold">
                {selectedProject?.name} / {formData?.title}
            </span>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold underline text-base">
                            Recommended Action
                        </CardTitle>
                        <CardTitle>{suggestionData.ACTIONABLE}</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-bold underline">Rationale</p>
                        <p>{suggestionData.RATIONALE}</p>
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-row w-full justify-end">
                            {suggestionData?.open ? (
                                <Button
                                    onClick={() => {
                                        setSuggestionAsDone(
                                            formId,
                                            suggestionId
                                        );
                                    }}
                                >
                                    Mark as Done
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setSuggestionAsOpen(
                                            formId,
                                            suggestionId
                                        );
                                    }}
                                >
                                    Re-open this Actionable
                                </Button>
                            )}
                        </div>
                    </CardFooter>
                </Card>

                {responseData != null ? (
                    <div className="flex flex-col w-full">
                        <span className="flex my-3 mt-10 text-xl font-semibold">
                            Mentioned by{" "}
                            {suggestionData.LINKED_RESPONSES.length} in the
                            following responses:
                        </span>

                        <div className="flex flex-col flex-grow">
                            <ResponsesTable
                                responseData={responseData}
                                formId={formId}
                            />
                        </div>
                    </div>
                ) : (
                    <div>No linked responses found</div>
                )}
            </div>
        </div>
    ) : loading ? (
        <div>
            <h1>Loading...</h1>
        </div>
    ) : (
        <div>
            <h1>Suggestion not found</h1>
        </div>
    );
}

export default SuggestionPage;
