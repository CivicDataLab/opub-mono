/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'node:url';
import createJiti from 'jiti';
import createNextIntlPlugin from 'next-intl/plugin';

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti('./env');

const withNextIntl = createNextIntlPlugin();
const nextConfig = withNextIntl({
  transpilePackages: ['opub-ui'],
});

export default nextConfig;
