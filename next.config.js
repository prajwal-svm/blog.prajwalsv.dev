/** @type {import('next').NextConfig} */

const generateSitemap = require('./scripts/generate-sitemap');

const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      generateSitemap();
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      }
    ];
  }
}

module.exports = withPWA(nextConfig)
