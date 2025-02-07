/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    if (config.name === "server")
      config.optimization.concatenateModules = false;
    return config;
  },
  reactStrictMode: true,
  compress: true,

  output: "standalone",
  trailingSlash: true,

  images: {
    remotePatterns: [
      {
        hostname: "pub-402f41e20b984c66a583408bb7b47aeb.r2.dev"
      }
    ]
  }
};
export default nextConfig;
