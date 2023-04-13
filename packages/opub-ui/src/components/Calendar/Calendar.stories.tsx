import { isWeekend } from '@internationalized/date';
import { Meta, StoryObj } from '@storybook/react';
import { useLocale } from 'react-aria';
import { Calendar } from './Calendar';
import { RangeCalendar } from './RangeCalendar';

/**
 * A calendar displays one or more date grids and allows users to select a single date.
 *
 * Reference: https://react-spectrum.adobe.com/react-aria/useCalendar.html
 */
const meta = {
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const metaRange = {
  component: RangeCalendar,
} satisfies Meta<typeof RangeCalendar>;
type RangeStory = StoryObj<typeof metaRange>;

export const Default: Story = {
  args: {},
};

export const UnavailableDates: Story = {
  render: ({ ...args }) => {
    let { locale } = useLocale();
    return (
      <Calendar
        isDateUnavailable={(date) => isWeekend(date, locale)}
        {...args}
      />
    );
  },
  args: {},
};

export const CalendarRange: RangeStory = {
  render: ({ ...args }) => {
    return <RangeCalendar {...args} />;
  },
  args: {},
};
