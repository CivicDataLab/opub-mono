/** @type {import('next').NextConfig} */
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  enabled: process.env.ANALYZE === "true"
});

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  transpilePackages: ["@opub-cdl/ui"]
};
