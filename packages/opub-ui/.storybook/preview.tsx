// import '@storybook/addon-actions';
// import '@storybook/addon-console';
import { themes } from '@storybook/theming';
import '../assets/styles.css';
import { Tooltip } from '../src/components/Tooltip';
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
      return (
        <Tooltip.Provider>
          <Story />
        </Tooltip.Provider>
      );
    },
  ],
};
export default preview;
