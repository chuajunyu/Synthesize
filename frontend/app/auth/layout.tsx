import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Authentication Page",
    description: "Authentication pages for the application",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-gradient-to-t from-indigo-500 from-30% via-purple-500 via-50% to-pink-500 flex flex-row items-end justify-between h-screen w-full">
            <div className="hidden md:flex flex-col items-center h-full w-2/5">
                <div className="flex flex-col items-center justify-center h-full w-4/5">
                    <div className="w-full mb-10 2xl:mb-24">
                        <h1 className="text-2xl 2xl:text-5xl font-bold text-left text-white mb-2 2xl:mb-5">
                            Synthesize
                        </h1>
                        <h1 className="text-lg 2xl:text-2xl text-white text-left">
                            Get insights in minutes instead of days.
                        </h1>
                        <h1 className="text-lg 2xl:text-2xl text-white text-left">
                            Analyzing feedback has never been this easy.
                        </h1>
                    </div>
                    <Image
                        src="/woman_computer.png"
                        alt="Image"
                        width={600}
                        height={600}
                        className="h-auto w-full xl:w-full 2xl:w-auto"
                    />
                    <div className="w-full mt-10">
                        <p className="text-sm text-white text-left">
                            Art by Pawel from{" "}
                            <Link
                                href="https://www.glazestock.com/image/1yRhwqQy7"
                                className="underline"
                            >
                                Glaze
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="right flex w-full md:w-3/5 md:shadow-xl">{children}</div>
        </div>
    );
}
