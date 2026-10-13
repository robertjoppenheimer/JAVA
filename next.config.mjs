/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.autocratic.in",
          },
        ],
        destination: "https://autocratic.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
