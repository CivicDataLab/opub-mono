import { themes } from 'storybook/theming';
import '../assets/styles.css';
import '../styles/_variables.css';
import { Toaster } from '../src/components/Toast';
import { Tooltip } from '../src/components/Tooltip';
import React from 'react';

export const parameters = {
  docs: {
    theme: themes.light,
  },
  options: {
    showPanel: false,
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
          <Toaster />
          <Story />
        </Tooltip.Provider>
      );
    },
  ],

  tags: ['autodocs']
};
export default preview;
