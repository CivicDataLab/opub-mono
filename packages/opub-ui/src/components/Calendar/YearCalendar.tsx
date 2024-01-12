import { cn } from '../../utils'
import { Icon } from '../Icon'
import { Text } from '../Text'
import styles from './Calendar.module.scss'
import { createCalendar } from '@internationalized/date'
import { DateValue } from '@react-types/calendar'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import React, { useRef } from 'react'
import {
	AriaCalendarProps,
	useCalendar,
	useDateFormatter,
	useLocale,
} from 'react-aria'
import {
	CalendarStateOptions,
	CalendarState,
	useCalendarState,
} from 'react-stately'

export const YearCalendar = (
	props: CalendarStateOptions<DateValue> | AriaCalendarProps<DateValue>
) => {
	let { locale } = useLocale()
	let state = useCalendarState({
		...props,
		locale,
		createCalendar,
	})

	let ref = useRef<any>(null)
	let { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
		props,
		state
	)

	function PrevButton() {
		const { isDisabled, onPress, onFocusChange, ...otherProps } =
			prevButtonProps
		return (
			<button
				{...otherProps}
				onClick={() =>
					state.setFocusedDate(state.focusedDate.subtract({ years: 1 }))
				}
			>
				<Icon source={IconArrowLeft} />
			</button>
		)
	}

	function NextButton() {
		const { isDisabled, onPress, onFocusChange, ...otherProps } =
			nextButtonProps
		return (
			<button
				{...otherProps}
				onClick={() =>
					state.setFocusedDate(state.focusedDate.add({ years: 1 }))
				}
			>
				<Icon source={IconArrowRight} />
			</button>
		)
	}

	const themeClass = cn(styles.Calendar, styles.YearCalendar)
	return (
		<div className={`opub-Calendar ${themeClass}`} {...calendarProps} ref={ref}>
			<div className={styles.Header}>
				<PrevButton />
				<YearDropdown state={state} />
				<NextButton />
			</div>

			<MonthSelector state={state} />
		</div>
	)
}

function YearDropdown({ state }: { state: CalendarState }) {
	let formatter = useDateFormatter({
		year: 'numeric',
		timeZone: state.timeZone,
	})
	let date = state.focusedDate

	return (
		<Text fontWeight="semibold">
			{formatter.format(date.toDate(state.timeZone))}
		</Text>
	)
}

function MonthSelector({ state }: any) {
	const [_, setChosenDate] = React.useState<any>(null)

	let onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const value = Number((e.target as HTMLElement).getAttribute('value'))
		let date = state.focusedDate.set({ month: value })
		state.setFocusedDate(date)
		state.setValue(date)
		setChosenDate({ month: date.month, year: date.year })
	}

	const monthsObj: {
		[key: number]: { month: string; value: number }[]
	} = {
		0: [
			{ month: 'Jan', value: 1 },
			{ month: 'Feb', value: 2 },
			{ month: 'Mar', value: 3 },
			{ month: 'Apr', value: 4 },
		],
		1: [
			{ month: 'May', value: 5 },
			{ month: 'Jun', value: 6 },
			{ month: 'Jul', value: 7 },
			{ month: 'Aug', value: 8 },
		],
		2: [
			{ month: 'Sep', value: 9 },
			{ month: 'Oct', value: 10 },
			{ month: 'Nov', value: 11 },
			{ month: 'Dec', value: 12 },
		],
	}

	const calendar = [...new Array(3).keys()].map((_, i) => {
		return (
			<div key={i}>
				{monthsObj[i].map((mon, i) => {
					const selected =
						state.focusedDate.month === mon.value &&
						state.focusedDate.year === state.value?.year

					return (
						<button
							key={i}
							onClick={(e) => {
								onClick(e)
							}}
							className={cn(
								styles.Cell,
								styles.YearCell,
								selected && styles.Selected
							)}
							value={mon.value}
						>
							<Text color="subdued">{mon.month}</Text>
						</button>
					)
				})}
			</div>
		)
	})

	return <div>{calendar}</div>
}
