/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites () {
    return {
      beforeFiles: [
        {
          source: '/__/auth/:path*',
          destination: `https://synthesize-dev.firebaseapp.com/__/auth/:path*`
        }
      ]
    }
  }
};

export default nextConfig;
