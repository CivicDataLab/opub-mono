/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  transpilePackages: ['opub-ui'],
};

module.exports = withNextIntl(nextConfig);
