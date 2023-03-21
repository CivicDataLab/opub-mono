import '../../../apps/web/styles/theme.css';
import '../../../apps/web/styles/breakpoints.scss';
import '@storybook/addon-actions';
import '@storybook/addon-console';
import '../../../apps/web/styles/base.css';
// import { Preview } from '@storybook/react';

export const parameters = {
  // actions: { argTypesRegex: '^on[A-Z].*' },
  // expanded: true,
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const preview = {
  parameters,
};
export default preview;
