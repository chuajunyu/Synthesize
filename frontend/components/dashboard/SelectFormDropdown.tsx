"use client";
import React, { useEffect } from "react";
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
import { Form } from "@/database/read_form_titles";
import { SetStateAction } from "react";
import { useSelectedForm } from "@/contexts/SelectFormContext";

interface ComboboxProps {
    forms: Form[];
    setExternalId: React.Dispatch<SetStateAction<string | null>>;
}

function SelectFormDropdown ({ forms, setExternalId }: ComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState("");
    const { selectedForm, setSelectedForm } = useSelectedForm();

    useEffect(() => {
        console.log(forms.filter((form: Form) => form.id === id));
        console.log(forms);
        console.log(id);
    }, [forms, id]);

    useEffect(() => {
        if (selectedForm) {
            setId(selectedForm.id);
            setExternalId(selectedForm.id);
        }
    }, [selectedForm]);

    useEffect(() => {
        if (id) {
            setSelectedForm(forms.filter((form: Form) => form.id === id)[0]);
        }
    }, [id]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-96 justify-between"
                >
                    {id
                        ? forms.filter((form: Form) => form.id === id)[0]?.title
                        : "Select Form to View Aggregated Insights"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
                <Command>
                    <CommandInput placeholder="Search for a form..." />
                    <CommandList>
                        <CommandEmpty>No forms found.</CommandEmpty>
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

export default SelectFormDropdown;
