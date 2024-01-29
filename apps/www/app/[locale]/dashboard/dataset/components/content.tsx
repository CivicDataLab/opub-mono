'use client'

import { LinkButton } from '@/components/Link'
import { Icons } from '@/components/icons'
import { Box, Icon, Text } from 'opub-ui'
import { twMerge } from 'tailwind-merge'

export function Content() {
	return (
		<div className="flex flex-col items-center justify-center h-full w-full grow">
			<div className={twMerge('flex flex-col items-center gap-4 h-100')}>
				<Icon
					source={Icons.addDataset}
					color="interactive"
					stroke={1}
					size={80}
				/>
				<Text variant="headingSm" color="subdued">
					You have not added any datasets yet.
				</Text>
				<Box paddingBlockStart="4">
					<LinkButton href="/dashboard/dataset/new">Add New Dataset</LinkButton>
				</Box>
			</div>
		</div>
	)
}
