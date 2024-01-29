import { Calendar } from './Calendar'
import { RangeCalendar } from './RangeCalendar'
import { YearCalendar } from './YearCalendar'
import { getLocalTimeZone, isWeekend } from '@internationalized/date'
import { Meta, StoryObj } from '@storybook/react'
import { useDateFormatter, useLocale } from 'react-aria'

/**
 * A calendar displays one or more date grids and allows users to select a single date.
 *
 * Reference: https://react-spectrum.adobe.com/react-aria/useCalendar.html
 */
const meta = {
	title: 'Components/Calendar',
	component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

const metaRange = {
	component: RangeCalendar,
} satisfies Meta<typeof RangeCalendar>
type RangeStory = StoryObj<typeof metaRange>

export const Default: Story = {
	args: {},
}

export const UnavailableDates: Story = {
	render: ({ ...args }) => {
		let { locale } = useLocale()
		return (
			<Calendar
				isDateUnavailable={(date) => isWeekend(date, locale)}
				{...args}
			/>
		)
	},
	args: {},
}

export const CalendarRange: RangeStory = {
	render: ({ ...args }) => {
		return <RangeCalendar {...args} />
	},
	args: {},
}

export const Year: any = {
	render: ({ ...args }) => {
		let formatter = useDateFormatter({ dateStyle: 'medium' })

		return (
			<YearCalendar
				{...args}
				onChange={(date: any) => {
					const formatted = formatter.format(date.toDate(getLocalTimeZone()))
					console.log(formatted)
				}}
			/>
		)
	},
	args: {},
}
