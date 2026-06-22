import {
  getLocalTimeZone,
  isWeekend,
  parseDate,
  parseTime,
  today,
} from '@internationalized/date';
import { Meta, StoryObj } from '@storybook/react-vite';
import { useDateFormatter, useLocale } from 'react-aria';

import { Calendar } from './Calendar';
import { MultiSelectYearCalendar } from './MultiSelectYearCalendar';
import { RangeCalendar } from './RangeCalendar';
import { YearCalendar } from './YearCalendar';

/**
 * A calendar displays one or more date grids and allows users to select a single date.
 *
 * Reference: https://react-spectrum.adobe.com/react-aria/useCalendar.html
 */
const meta = {
  title: 'Components/Calendar',
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

export const Year: any = {
  render: ({ ...args }) => {
    let formatter = useDateFormatter({ dateStyle: 'medium' });

    return (
      <YearCalendar
        {...args}
        onChange={(date: any) => {
          const formatted = formatter.format(date.toDate(getLocalTimeZone()));
          console.log(formatted);
        }}
      />
    );
  },
  args: {},
};

export const YearDisabled: any = {
  render: ({ ...args }) => {
    let formatter = useDateFormatter({ dateStyle: 'medium' });

    return (
      <YearCalendar
        minValue={parseDate('2021-01-01')}
        maxValue={today(getLocalTimeZone())}
        {...args}
        onChange={(date: any) => {
          const formatted = formatter.format(date.toDate(getLocalTimeZone()));
          console.log(formatted);
        }}
      />
    );
  },
  args: {},
};

export const MultiSelectYear: any = {
  render: ({ ...args }) => {
    return (
      <MultiSelectYearCalendar
        {...args}
        onChange={(dates: any) => {
          console.log(dates);
        }}
      />
    );
  },
  args: {},
};

export const MultiSelectYearDisabled: any = {
  render: ({ ...args }) => {
    return (
      <MultiSelectYearCalendar
        minValue={parseDate('2021-01-01')}
        maxValue={today(getLocalTimeZone())}
        {...args}
        onChange={(dates: any) => {
          console.log(dates);
        }}
      />
    );
  },
  args: {},
};

/**
 * Consumers translate the calendar's aria-label strings by passing `labels`,
 * the same way the Table footer accepts localized labels. Inspect a selected
 * month's aria-label to see the localized "selected" suffix.
 */
export const YearLocalizedLabels: any = {
  render: ({ ...args }) => {
    return (
      <YearCalendar
        labels={{ selected: 'sélectionné' }}
        {...args}
        onChange={(date: any) => {
          console.log(date);
        }}
      />
    );
  },
  args: {},
};
