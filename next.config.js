/** @type {import('next').NextConfig} */

const withSass = require('@zeit/next-sass');
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img-c.udemycdn.com'],
  },
};

(module.exports = nextConfig),
  withSass({
    sassLoaderOptions: {},
  });
