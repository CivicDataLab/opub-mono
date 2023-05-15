/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@opub-cdl/ui', 'react-aria'],
};

module.exports = nextConfig;
