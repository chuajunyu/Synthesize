"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

export interface Form {
    id: string;
    title: string;
}

interface FormContextType {
    selectedForm: Form;
    setSelectedForm: (form: Form) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
    children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
    const [selectedForm, setSelectedForm] = useState<Form | null>(null);

    useEffect(() => {
        async function initializeProject() {
            const storage = sessionStorage.getItem("selectedForm");

            if (storage != null) {
                console.log(storage, "storage");
                setSelectedForm(JSON.parse(storage));
            } 
        }
        initializeProject();
    }, []);

    useEffect(() => {
        if (selectedForm != null) {
            sessionStorage.setItem(
                "selectedForm",
                JSON.stringify(selectedForm)
            );
        }
    }, [selectedForm]);

    return (
        <FormContext.Provider
            value={{ selectedForm: selectedForm!, setSelectedForm }}
        >
            {children}
        </FormContext.Provider>
    );
}

export const useSelectedForm = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useSelectedForm must be used within a FormProvider");
    }
    return context;
};
