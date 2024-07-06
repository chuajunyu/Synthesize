import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex min-h-screen w-full transform flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 2xl:px-80">
      <div className="flex flex-row items-center justify-between px-6 py-5 sm:px-12">
        <div>
          <h2 className="text-center text-2xl font-medium text-white">
            Synthesize
          </h2>
        </div>
        <div>
          <Link href="/auth/login">
            <button className="rounded-full bg-slate-300/20 px-6 py-2 text-lg font-semibold text-white shadow-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-5 flex flex-col px-4 py-5 sm:px-20 md:flex-row">
        <div className="flex flex-col sm:w-1/2">
          <h1 className="mb-5 text-wrap text-center text-5xl font-bold text-white sm:text-left sm:text-7xl">
            Transform your feedback into insights
          </h1>
          <p className="mb-5 text-center text-2xl text-white sm:text-left">
            Aggregate and analyze customer sentiments quickly using Synthesize
            and get actionable insights for your businesses or projects fast.
          </p>
          <div className="flex flex-row justify-center sm:justify-start">
            <Link href="/auth/signup">
              <button className="flex flex-row items-center self-center rounded-full bg-slate-300/20 px-5 py-3 text-lg font-semibold text-white shadow-lg sm:text-2xl">
                Get started with Synthesize now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="ml-2 size-7 pt-1"
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
        <div className="mb-10 flex flex-col sm:mb-0 sm:w-1/2 sm:justify-center">
          <Image
            src="/truffle.png"
            alt="landing"
            width={500}
            height={500}
            className="mt-10 rounded-2xl shadow-xl sm:ml-16"
          />
          <p className="mt-3 text-center italic text-white sm:ml-16 sm:text-right">
            I discovered what my customers thought of McDonald's new Truffle
            Cheese Sauce in just 5 minutes using Synthesize!
          </p>
          <p className="ml-16 text-center font-light italic text-white sm:text-right">
            - McDonald's Top Employee of the Month
          </p>
        </div>
      </div>
    </div>
  );
}
