/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['opub-ui', 'react-aria'],
};

module.exports = nextConfig;
