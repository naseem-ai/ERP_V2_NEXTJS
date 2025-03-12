import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
  	unoptimized: true,
  	dangerouslyAllowSVG: true,
    domains: ['placehold.co', 'img.youtube.com'], // Add the domain you're using here
  }
};

export default nextConfig;
