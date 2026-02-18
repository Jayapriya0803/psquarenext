/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mindful-flame-5c745d4a25.strapiapp.com",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
