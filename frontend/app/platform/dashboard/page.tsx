"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from "@/lib/firebase/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress" 

const dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const { user } = useAuth();
    
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

    if (loading) {
        return <div>Loading...</div>;
    }

    const name = user?.displayName;

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen">
                <div className="justify-center w-full ml-20 mt-5">
                    <span className="flex mt-3 mb-3 text-xl font-semibold">
                        View aggregated insights for Project_1, {name}
                    </span>
                    <div className="flex flex-row w-full items-stretch">
                        <Card className="w-1/5 mr-5">
                            <CardHeader className="pb-2">
                                <CardDescription>Rating</CardDescription>
                                <CardTitle className="text-4xl">4.0 / 5.0</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">+25% from last week</div>
                                <Progress value={80} aria-label="25% increase" className="mt-2 mb-2"/>
                            </CardContent>
                        </Card>
                        <Card className="flex-grow w-4/5 mr-20">
                            <CardHeader className="pb-3">
                                <CardTitle>Actionable Insights</CardTitle>
                                <CardDescription className="flex flex-col text-base leading-relaxed">
                                <div className="mt-1">
                                    - Introducing Our Dynamic Orders Dashboard for Seamless Management and
                                Insightful Analysis.
                                </div>
                                <div>
                                    - Introducing Our Dynamic Orders Dashboard for Seamless Management and
                                Insightful Analysis.
                                </div>
                                <span>
                                    - Introducing Our Dynamic Orders Dashboard for Seamless Management and
                                Insightful Analysis.
                                </span>
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="justify-center w-full mt-5">
                        <Card className="flex-grow mr-20">
                            <CardHeader className="pb-3">
                                <CardTitle>Compliments</CardTitle>
                                <CardDescription className="flex flex-col text-base leading-relaxed">
                                <div className="mt-1">
                                    - Introducing Our Dynamic Orders Dashboard for Seamless Management and
                                Insightful Analysis.
                                </div>
                                <div>
                                    - Introducing Our Dynamic Orders Dashboard for Seamless Management and
                                Insightful Analysis.
                                </div>
                                <span>
                                    - Introducing Our Dynamic Orders Dashboard for Seamless Management and
                                Insightful Analysis.
                                </span>
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="flex-grow mr-20 mt-5">
                            <CardHeader className="pb-3">
                                <CardTitle>Complaints</CardTitle>
                                <CardDescription className="flex flex-col text-base leading-relaxed">
                                <div className="mt-1">
                                    - Introducing Our Dynamic Orders Dashboard for Seamless Management and
                                Insightful Analysis.
                                </div>
                                <div>
                                    - Introducing Our Dynamic Orders Dashboard for Seamless Management and
                                Insightful Analysis.
                                </div>
                                <span>
                                    - Introducing Our Dynamic Orders Dashboard for Seamless Management and
                                Insightful Analysis.
                                </span>
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                </div>
            </div>
        </ProtectedRoute>
    );
}

export default dashboard