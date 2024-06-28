import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="flex flex-col h-screen w-full transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="flex flex-row py-5 px-12 justify-between items-center">
                <div>
                    <h2 className="text-2xl text-center font-medium text-white">
                        Synthesize
                    </h2>
                </div>
                <div>
                    <Link href="/auth/login">
                        <button className="rounded-full px-6 py-2 text-lg text-white bg-slate-300/20 font-semibold shadow-lg">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
            <div className="py-5 px-20 flex flex-row mt-5">
                <div className="flex flex-col w-1/2">
                    <h1 className="text-7xl text-wrap text-white mb-5 font-bold">
                        Transform your feedback into insights
                    </h1>
                    <p className="text-white text-2xl mb-5">
                        Aggregate and analyze customer sentiments quickly using
                        Synthesize and get actionable insights for your
                        businesses or projects fast.
                    </p>
                    <div className="">
                        <Link href="/auth/signup">
                            <button className="rounded-full px-5 py-3 text-2xl text-white bg-slate-300/20 font-semibold shadow-lg flex flex-row justify-center items-center">
                                Get started with Synthesize now
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={3}
                                    stroke="currentColor"
                                    className="size-7 ml-2 pt-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2">
                    <Image 
                        src="/truffle.png"
                        alt="landing"
                        width={500}
                        height={500}
                        className="mt-10 ml-16 rounded-2xl shadow-xl"
                    />
                    <p className="ml-16 mt-3 text-white italic text-right">
                        I discovered what my customers thought of McDonald's new Truffle Cheese Sauce in just 5 minutes using Synthesize!
                    </p>
                    <p className="ml-16 text-white italic font-light text-right">
                        - McDonald's Top Employee of the Month
                    </p>
                </div>

            </div>
        </div>
    );
}
