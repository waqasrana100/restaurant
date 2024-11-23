const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Match all routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Adjust to specific origins as needed
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS", // Add other methods as needed
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization", // Add necessary headers
          },
        ],
      },
    ];
  },
  images: {
    domains: ["16.170.247.109"], // Add your hostname here
  },
  ignoreBuildErrors: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withNextIntl(nextConfig);
