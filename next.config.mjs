/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // fully static site -> ./out
  trailingSlash: true,     // keeps WordPress-style URLs: /ca/, /about/ ...
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
