import { FormProvider } from "@/contexts/SelectFormContext";

export default function InsightsDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <FormProvider>{children}</FormProvider>;
}
