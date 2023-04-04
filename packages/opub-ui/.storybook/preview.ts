import '@storybook/addon-actions';
import '@storybook/addon-console';
import '../assets/styles.scss';

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
