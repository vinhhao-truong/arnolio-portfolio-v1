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
    ARNOLIO_EMAIL: "arnolio.truong@outlook.com",
    PERSONAL_EMAIL: "vinhhao.truong.52@gmail.com",
    FIREBASE_API_KEY: "AIzaSyAZ_m71bHrwp_RoZi5BB1QGOwB8dAg1XiY",
    PROJECT_API:
      "https://arnolio-default-rtdb.asia-southeast1.firebasedatabase.app/project.json",
    FIREBASE_DB_URL:
      "https://arnolio-default-rtdb.asia-southeast1.firebasedatabase.app",
    FIREBASE_APP_ID: "1:867317732754:web:92f628c9ee3edcc5649d4b",
    MAILJET_API_KEY: "b472ab590aef71d36795db49dfa06780",
    MAILJET_SECRET_KEY: "9fdd897cef8d666fbceac1642aa0ed50",
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
