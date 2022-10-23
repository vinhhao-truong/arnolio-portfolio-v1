/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    ARNOLIO_USER: "arnolio.truong@outlook.com",
    ARNOLIO_PASS: "Zhang12345",
    TO_EMAIL: "vinhhao.truong.52@gmail.com",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
    ],
  },
};

module.exports = nextConfig;
