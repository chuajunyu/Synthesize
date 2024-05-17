import "@/app/globals.css";
import { auth } from "@/components/authFunctions";
import { redirect } from "next/navigation";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}