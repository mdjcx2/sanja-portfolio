/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/work", destination: "/portfolio", permanent: false },
    ];
  },
};

export default nextConfig;
