import { themes } from '@storybook/theming';
import { Tooltip } from 'opub-ui';
import React from 'react';
import '../assets/styles.css';
import '../styles/global.css';

export const parameters = {
  docs: {
    theme: themes.light,
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
