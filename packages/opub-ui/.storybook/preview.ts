import '../../../apps/web/styles/breakpoints.scss';
import '@storybook/addon-actions';
import '@storybook/addon-console';
import '../assets/tokens.css';

export const parameters = {
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
