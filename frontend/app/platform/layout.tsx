import "@/app/globals.css";
import { NavigationBar } from "@/components/NavigationBar";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row">
            <div>
                <NavigationBar user={"test"} />
            </div>
            <div className="flex-auto">{children}</div>
        </div>
    );
}
