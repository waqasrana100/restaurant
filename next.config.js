const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["16.170.247.109"], // Add your hostname here
  },
};

module.exports = withNextIntl(nextConfig);
