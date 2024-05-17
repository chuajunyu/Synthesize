import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}