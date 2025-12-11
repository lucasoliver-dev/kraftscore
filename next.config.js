/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'media.api-sports.io', 
      'media-2.api-sports.io',
      'media-1.api-sports.io',
      'media-3.api-sports.io',
    ],
  },
  publicRuntimeConfig: {
    API_FOOTBALL_KEY: process.env.API_FOOTBALL_KEY,
    API_FOOTBALL_HOST: process.env.API_FOOTBALL_HOST,
  },
}

module.exports = nextConfig
