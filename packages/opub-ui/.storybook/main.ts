import { StorybookConfig } from '@storybook/react-vite';
const turbosnap = require('vite-plugin-turbosnap');
const { mergeConfig } = require('vite');

const config = {
  stories: ['../src'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins:
        configType === 'PRODUCTION'
          ? [turbosnap({ rootDir: config.root ?? process.cwd() })]
          : [],
    });
  },
};

export default config;
