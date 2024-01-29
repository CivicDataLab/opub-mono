import { Icons } from '@/components/icons'
import { Button, Divider, Icon, Text } from 'opub-ui'

export function DistributionList({
	setPage,
}: {
	setPage: (page: 'list' | 'create') => void
	setEditId: (id: string) => void
}) {
	return (
		<div>
			<Text variant="headingMd">Add Distribution</Text>
			<div className="pt-4">
				<Divider />
			</div>
			<div className="py-20">
				<NoList setPage={setPage} />
			</div>
		</div>
	)
}

const NoList = ({
	setPage,
}: {
	setPage: (page: 'list' | 'create') => void
}) => {
	return (
		<div className="flex flex-col items-center justify-center p-6">
			<Icon
				source={Icons.distribution}
				size={64}
				stroke={1}
				color="interactive"
			/>
			<div className="pt-4">
				<Text variant="headingSm" color="subdued">
					You have not added any distributions yet.
				</Text>
			</div>
			<div className="pt-6">
				<Button onClick={() => setPage('create')}>Add Distribution</Button>
			</div>
		</div>
	)
}
