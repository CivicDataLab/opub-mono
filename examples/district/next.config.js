/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  transpilePackages: ['opub-ui', 'react-aria'],
};

module.exports = withNextIntl(nextConfig);
