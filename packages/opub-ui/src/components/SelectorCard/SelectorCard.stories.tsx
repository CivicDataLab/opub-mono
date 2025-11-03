import { Meta, StoryObj } from '@storybook/react';

import { Pill } from '../Pill';
import { SelectorCard } from './SelectorCard';

/**
 * Selector Card is a component that displays a title, a selected value, and a button.
 */
const meta = {
  title: 'Components/SelectorCard',
  component: SelectorCard,
} satisfies Meta<typeof SelectorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'SelectorCard',
    selected:
      'Person Days Generated as a share of Cumulative Projection of Person Days',
    buttonText: 'Switch Indicator',
    onClick: () => {},
  },
};

export const Pills: Story = {
  args: {
    title: 'SelectorCard',
    selected: (
      <>
        <Pill
          variant="info"
          truncate
          onRemove={(e) => {
            console.log(e);
          }}
          returnValue="1"
        >
          Person Days Generated as a share of Cumulative Projection of Person
          Days
        </Pill>
        <Pill variant="info" truncate onRemove={() => {}} returnValue="2">
          Person Days Generated as a share of Cumulative Projection of Person
          Days
        </Pill>
        <Pill variant="info" truncate onRemove={() => {}} returnValue="3">
          Person Days Generated as a share of Cumulative Projection of Person
          Days
        </Pill>
      </>
    ),
    buttonText: 'Edit Indicators',
    onClick: () => {},
  },
};
