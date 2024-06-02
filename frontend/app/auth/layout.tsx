import "@/app/globals.css";
import Image from 'next/image';

export const metadata = {
  title: "Login Page",
  description: "Login page for the application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className="flex h-full w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="bg-slate-50 hidden bg-muted lg:block" style={{ position: 'relative', height: '100%' }}>
        <Image
            src="/pawel-nolbert-city.jpg"
            alt="Image"
            width={2400}
            height={3000}
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            
        />
      </div>
      <div className="right flex items-center justify-evenly py-12">
        {children}
      </div> 
    </div>
  )
}