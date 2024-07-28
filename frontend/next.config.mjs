/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false, // Disable React Strict Mode
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/__/auth/:path*",
          destination: `https://synthesize-dev.firebaseapp.com/__/auth/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
