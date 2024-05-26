import "@/app/globals.css";
import { auth } from "@/components/authFunctions";
import { redirect } from "next/navigation";
import { NavigationBar } from "@/components/NavigationBar";

export const metadata = {
  title: "Synthesize",
  description: "Create forms, surveys and quizzes seamlessly with AI",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  let session = await auth();
  let user = session?.user?.email;

  return (
    !user ? redirect("/auth/login") :
    <div className="flex flex-row">
      <div>
        <NavigationBar user={user} />
      </div>
      <div className="flex-auto">
        {children}
      </div>
    </div>
  );
}