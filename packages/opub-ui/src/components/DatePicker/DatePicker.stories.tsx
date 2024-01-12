import { DatePicker } from './DatePicker'
import { DateRangePicker } from './DateRangePicker'
import { MonthPicker } from './MonthPicker'
import { getLocalTimeZone, today, parseDate } from '@internationalized/date'
import { Meta, StoryObj } from '@storybook/react'

/**
 * A date picker combines a DateField and a Calendar popover to allow users to enter or select a date and time value.
 *
 * Reference: https://react-spectrum.adobe.com/react-aria/useDatePicker.html
 */
const meta = {
	title: 'Components/DatePicker',
	component: DatePicker,
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

const metaRange = {
	component: DateRangePicker,
} satisfies Meta<typeof DateRangePicker>
type StoryRange = StoryObj<typeof metaRange>

export const Default: Story = {
	args: {
		label: 'Date Picker',
	},
}

export const Range: StoryRange = {
	render: ({ ...args }) => <DateRangePicker {...args} />,
	args: {
		label: 'Date Range Picker',
		onChange: (val) => console.log(val),
	},
}

export const Month: Story = {
	render: ({ ...args }) => <MonthPicker {...args} />,
	args: {
		label: 'Month Picker',
		onChange: (val) => console.log(val),
	},
}

export const DisabledDates: StoryRange = {
	...Range,
	args: {
		label: 'Date Picker',
		minValue: today(getLocalTimeZone()),
		defaultValue: {
			start: parseDate('2022-02-03'),
			end: parseDate('2022-05-03'),
		},
		errorMessage: 'Date must be in the future',
	},
}
