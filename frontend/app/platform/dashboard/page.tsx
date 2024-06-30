"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { getFormTitles } from "@/database/read_form_titles";
import { Form } from "@/database/read_form_titles";
import { SetStateAction } from "react";
import Actionables from "@/components/Actionables";
import Insights from "@/components/Insights";
import { ActionablesProps } from "@/components/Actionables";

interface ComboboxProps {
    forms: Form[];
    setExternalId: React.Dispatch<SetStateAction<string | null>>;
}

const Combobox = ({ forms, setExternalId }: ComboboxProps) => {
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState("");

    useEffect(() => {
        console.log(forms.filter((form: Form) => form.id === id));
        console.log(forms);
        console.log(id);
    }, [forms, id]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {id
                        ? forms.filter((form: Form) => form.id === id)[0]?.title
                        : "Select Form to View Aggregated Insights"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {forms.map((form: Form) => (
                                <CommandItem
                                    key={form.id}
                                    value={form.id}
                                    onSelect={(currentId: string) => {
                                        setId(
                                            currentId === id ? "" : currentId
                                        );
                                        setOpen(false);
                                        setExternalId(currentId);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            id === form.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {form.title}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

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
            const apiEndpoint = `https://synthesize-wcnj.onrender.com/get_form_analysis/${externalId}?secret=furballlovesfishball`;
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
                    console.log(data);
                    setAnalysisResponse(data);
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

    const name = user?.displayName;

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen">
                <div className="justify-center w-full mx-8 mt-5">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        View aggregated insights for Project_1, {name}
                    </span>
                    <div className="my-4">
                        <Combobox
                            forms={formData}
                            setExternalId={setExternalId}
                        />
                    </div>

                    {externalId === null ? (
                        <div>Select a Form</div>
                    ) : analysisResponse ==
                      "No Content: Your form has no responses yet!" ? (
                        <div>No Content</div>
                    ) : (
                        <div>
                            <div className="flex flex-row w-full items-stretch space-x-6">
                                <Card className="w-1/5">
                                    <CardHeader className="pb-2">
                                        <CardDescription>
                                            Rating
                                        </CardDescription>
                                        <CardTitle className="text-4xl">
                                            4.0 / 5.0
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-xs text-muted-foreground">
                                            +25% from last week
                                        </div>
                                        <Progress
                                            value={80}
                                            aria-label="25% increase"
                                            className="mt-2 mb-2"
                                        />
                                    </CardContent>
                                </Card>
                                <Card className="flex-grow w-4/5">
                                    <CardHeader className="pb-3">
                                        <CardTitle>
                                            Actionable Insights
                                        </CardTitle>
                                        <CardDescription className="flex flex-col text-base leading-relaxed">
                                            {analysisResponse === undefined ||
                                            analysisResponse === null ? (
                                                <div>Loading...</div>
                                            ) : (
                                                (
                                                    Object.values(
                                                        analysisResponse
                                                            ?.content
                                                            ?.aggregated_suggestions || {}
                                                    ) as ActionablesProps[]
                                                ).map(
                                                    (
                                                        value: ActionablesProps,
                                                        index: number
                                                    ) => (
                                                        <Actionables
                                                            key={index}
                                                            Actionable={
                                                                value[
                                                                    "Actionable"
                                                                ]
                                                            }
                                                            Rationale={
                                                                value[
                                                                    "Rationale"
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )
                                            )}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                            <div className="justify-center w-full mt-5">
                                <Card className="flex-grow">
                                    <CardHeader className="pb-3">
                                        <CardTitle>Compliments</CardTitle>
                                        <CardDescription className="flex flex-col text-base leading-relaxed">
                                            {analysisResponse === undefined ||
                                            analysisResponse === null ? (
                                                <div>Loading...</div>
                                            ) : (
                                                (
                                                    Object.values(
                                                        analysisResponse
                                                            ?.content
                                                            ?.aggregated_positive || {}
                                                    ) as string[]
                                                ).map(
                                                    (
                                                        value: string,
                                                        index: number
                                                    ) => (
                                                        <Insights
                                                            key={index}
                                                            insight={value}
                                                        />
                                                    )
                                                )
                                            )}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="flex-grow mt-5">
                                    <CardHeader className="pb-3">
                                        <CardTitle>Complaints</CardTitle>
                                        <CardDescription className="flex flex-col text-base leading-relaxed">
                                            {analysisResponse === undefined ||
                                            analysisResponse === null ? (
                                                <div>Loading...</div>
                                            ) : (
                                                (
                                                    Object.values(
                                                        analysisResponse
                                                            ?.content
                                                            ?.aggregated_negative || {}
                                                    ) as string[]
                                                ).map(
                                                    (
                                                        value: string,
                                                        index: number
                                                    ) => (
                                                        <Insights
                                                            key={index}
                                                            insight={value}
                                                        />
                                                    )
                                                )
                                            )}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default dashboard;
