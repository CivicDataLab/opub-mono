// import '@storybook/addon-actions';
// import '@storybook/addon-console';
import { themes } from '@storybook/theming';
import 'leaflet/dist/leaflet.css';
import '../assets/styles.css';
import React from 'react';

export const parameters = {
  parameters: {
    docs: {
      theme: themes.light,
    },
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
