/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Local development (keep this)
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },

      // Strapi Cloud (VERY IMPORTANT)
      {
        protocol: "https",
        hostname: "mindful-flame-5c745d4a25.strapiapp.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
