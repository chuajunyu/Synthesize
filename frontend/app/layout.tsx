import "./globals.css";
import { AuthProvider } from "@/lib/firebase/AuthContext";
import ClientProviders from "@/components/ClientProviders";
import { Providers } from "@/redux/provider";

export const metadata = {
  title: "Synthesize",
  description: "Create forms, surveys and quizzes seamlessly with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  
  return (
    <html lang="en">
      <Providers>
        <AuthProvider>
          <ClientProviders>
            <body>{children}</body>
          </ClientProviders>
        </AuthProvider>
      </Providers>
    </html>
  );
}