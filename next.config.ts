import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.azure.com',
      },
    ],
  },
  // Add trusted hosts
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'http://localhost:3000, http://0.0.0.0:3000, https://*.azure.com',
        },
      ],
    },
  ],
};

export default nextConfig;
