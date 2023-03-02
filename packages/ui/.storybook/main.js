module.exports = {
  stories: ['../src'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      allowSyntheticDefaultImports: false,
      esModuleInterop: false,
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @radix-ui packages
      propFilter: (prop) =>
        prop.parent
          ? !/node_modules\/(?!@radix-ui)/.test(prop.parent.fileName)
          : true,
    },
  },
};
