// import '@storybook/addon-actions';
// import '@storybook/addon-console';
import { themes } from '@storybook/theming';
import '../assets/styles.css';
import '../styles/_variables.css';
import { Tooltip } from '../src/components/Tooltip';
import React from 'react';

export const parameters = {
  docs: {
    theme: themes.light,
  },
  options: {
    storySort: {
      order: [
        'Guides',
        ['Introduction'],
        'Foundations',
        'Styles',
        'Patterns',
        'components',
      ],
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
