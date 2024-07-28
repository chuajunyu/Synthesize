"use client";
import React, { useState } from "react";
import create_aiForm from "@/database/create_aiForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/firebase/AuthContext";
import AlertFormShareLink from "@/components/AlertFormShareLink";
import { useProject } from "@/contexts/ProjectContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function FormBuilder() {
  const { selectedProject } = useProject();
  const [description, setDescription] = useState<string>(""); // form description
  const [information, setInformation] = useState("");
    const [key, setKey] = useState<string>("");
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);

  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
    
  // Function to handle submitting a new form
  const handleSubmit = async () => {
    const email = user?.email ?? "";

    // Call the backend create_form function here to store form data in database
    const newKey = create_aiForm(
      email,
      description,
      information,
      current.toString(),
      selectedProject.id
    );
    setKey(newKey);

    // set the page back to its original state
    setDescription("");
    setCurrent(0);
    setInformation("");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-8 mx-8 mt-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create a New AI Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col w-full space-y-4">
              <div className="flex flex-col w-full space-y-1">
                <Label
                  htmlFor="form-title"
                  className="flex justify-start font-medium text-lg"
                >
                  Form Context/Description
                </Label>
                <Input
                  id="form-description"
                  placeholder="Provide description or context for creating this form."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full space-y-1 mr-48">
                <Label
                  htmlFor="form-information"
                  className="flex justify-start font-medium text-lg"
                >
                  Information to Gather
                </Label>
                <Input
                  id="form-information"
                  className="flex w-full break-words"
                  placeholder="What information do you want to gather?"
                  value={information}
                  onChange={(e) => setInformation(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <Label
                  htmlFor="form-numberOfQuestions"
                  className="flex font-medium text-lg items-start"
                >
                  Target Number of Questions
                </Label>
                <div className="flex pb-10 w-1/4 h-1/4 pt-2">
                  <Carousel
                    setApi={setApi}
                    className="w-full max-w-xs ml-12"
                    onClick={(e) => e.preventDefault()}
                  >
                    <CarouselContent className="h-[150px]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-4xl font-semibold">
                                {index + 1}
                              </span>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

          <AlertFormShareLink handleSubmit={handleSubmit} shareKey={key} isManualForm={false} selectedProject={selectedProject.id}/>
    </div>
  );
}
