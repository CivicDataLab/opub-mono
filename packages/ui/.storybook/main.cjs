const {
  mergeConfig
} = require('vite');
module.exports = {
  stories: ['../src'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  features: {
    storyStoreV7: true
  }
  // async viteFinal(config, { configType }) {
  //   return mergeConfig(config, {
  //     optimizeDeps: {
  //       include: [
  //         '@storybook/addon-links',
  //         '@storybook/addon-essentials',
  //         '@storybook/addon-interactions',
  //       ],
  //     },
  //   });
  // },
  ,

  docs: {
    autodocs: true
  }
};