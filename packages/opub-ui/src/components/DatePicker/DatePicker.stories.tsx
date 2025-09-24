import React from 'react';
import {
  DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date';
import { Meta, StoryObj } from '@storybook/react-vite';
import * as chrono from 'chrono-node';

import { TextField } from '../TextField';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';
import { MonthPicker } from './MonthPicker';
import { MultiMonthPicker } from './MultiMonthPicker';

/**
 * A date picker combines a DateField and a Calendar popover to allow users to enter or select a date and time value.
 *
 * Reference: https://react-spectrum.adobe.com/react-aria/useDatePicker.html
 */
const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const metaRange = {
  component: DateRangePicker,
} satisfies Meta<typeof DateRangePicker>;
type StoryRange = StoryObj<typeof metaRange>;

export const Default: Story = {
  render: ({ ...args }) => {
    return <DatePicker {...args} />;
  },
  args: {
    label: 'Date Picker',
  },
};

export const Range: StoryRange = {
  render: ({ ...args }) => <DateRangePicker {...args} />,
  args: {
    label: 'Date Range Picker',
    onChange: (val) => console.log(val),
  },
};

export const Month: Story = {
  render: ({ ...args }) => <MonthPicker {...args} />,
  args: {
    label: 'Month Picker',
    onChange: (val) => console.log(val),
    defaultValue: parseDate('2023-03-01'),
    minValue: parseDate('2023-02-01'),
    maxValue: parseDate('2024-04-01'),
  },
};

export const MultipleMonths: Story = {
  render: ({ ...args }) => (
    <MultiMonthPicker
      {...args}
      selectedValues={[parseDate('2023-02-01'), parseDate('2024-05-01')]}
      // defaultValues={[]}
      onChange={(val) => console.log(val)}
      minValue={parseDate('2024-01-01')}
      maxValue={parseDate('2024-06-01')}
    />
  ),
  args: {
    label: 'Multiple Month Picker',
  },
};

export const DisabledDates: StoryRange = {
  ...Range,
  args: {
    label: 'Date Picker',
    minValue: today(getLocalTimeZone()),
    defaultValue: {
      start: parseDate('2022-02-04'),
      end: parseDate('2022-05-03'),
    },
    errorMessage: 'Date must be in the future',
  },
};

export const Experiment: Story = {
  render: ({ ...args }) => {
    const [date, setDate] = React.useState<DateValue | null>(null);

    return (
      <div>
        <DatePicker value={date} onChange={(e) => setDate(e)} {...args} />
        <div className="mt-4 max-w-20">
          <TextField
            label="write date"
            name="date"
            onChange={(e) => {
              if (chrono.parse(e).length) {
                const chronoDate = chrono.parse(e)[0].start;

                const formattedDate = `${chronoDate.get('year')}-${minTwoDigits(chronoDate.get('month'))}-${minTwoDigits(chronoDate.get('day'))}`;
                setDate(parseDate(formattedDate));
              }
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    label: 'Date Picker with Chrono',
  },
};

function minTwoDigits(n: number | null) {
  if (n === null) return '00';
  return (n < 10 ? '0' : '') + n;
}
