// import '@storybook/addon-actions';
// import '@storybook/addon-console';
import '../assets/styles.css';
import { themes } from '@storybook/theming';

export const parameters = {
  parameters: {
    docs: {
      theme: themes.light,
    },
  },
};

const preview = {
  parameters,
};
export default preview;
