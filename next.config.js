/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  reactStrictMode: false,
  swcMinify: true,
  env: {
    ARNOLIO_USER: "arnolio.truong@outlook.com",
    ARNOLIO_PASS: "Zhang12345",
    TO_EMAIL: "vinhhao.truong.52@gmail.com",
    FIREBASE_API_KEY: "AIzaSyAZ_m71bHrwp_RoZi5BB1QGOwB8dAg1XiY",
    FIREBASE_DB_URL:
      "https://arnolio-default-rtdb.asia-southeast1.firebasedatabase.app",
    FIREBASE_APP_ID: "1:867317732754:web:92f628c9ee3edcc5649d4b",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "www.jds.net.au",
      },
    ],
  },
};

module.exports = nextConfig;
