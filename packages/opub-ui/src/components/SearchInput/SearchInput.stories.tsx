import { SearchInput } from './SearchInput'
import { Meta, StoryObj } from '@storybook/react'

/**
 * Search Input Component made from Input and IconButton
 */
const meta = {
	title: 'Components/SearchInput',
	component: SearchInput,
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		defaultValue: 'Search',
		onChange: (e) => {
			console.log('onChange', e)
		},
		onSubmit: (e) => {
			console.log('onSubmit', e)
		},
		name: 'Search',
		label: 'Search',
	},
}

export const WithButton: Story = {
	args: {
		defaultValue: 'Search',
		onChange: (e) => {
			console.log('onChange', e)
		},
		onSubmit: (e) => {
			console.log('onSubmit', e)
		},
		withButton: true,
		name: 'Search',
		label: 'Search',
	},
}

export const Disabled: Story = {
	args: {
		defaultValue: 'Search',
		onChange: (e) => {
			console.log('onChange', e)
		},
		onSubmit: (e) => {
			console.log('onSubmit', e)
		},
		withButton: true,
		disabled: true,
		name: 'Search',
		label: 'Search',
	},
}
