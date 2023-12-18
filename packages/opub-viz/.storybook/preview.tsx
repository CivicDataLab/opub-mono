import { themes } from '@storybook/theming';
import React from 'react';
import '../assets/styles.css';

export const parameters = {
  docs: {
    theme: themes.light,
  },
};

const preview = {
  parameters,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};
export default preview;
