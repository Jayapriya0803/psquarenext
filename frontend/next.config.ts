/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;
