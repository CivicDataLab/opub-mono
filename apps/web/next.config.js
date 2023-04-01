const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: false,
  transpilePackages: ['@opub-cdl/ui'],
};
