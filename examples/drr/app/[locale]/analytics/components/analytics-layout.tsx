'use client'
import React from 'react'
import { MapComponent } from './map-component'
import { ANALYTICS_GEOGRAPHY_DATA, ANALYTICS_REVENUE_MAP_DATA } from '@/config/graphql/analaytics-queries'
import { useQuery } from '@tanstack/react-query'
import { GraphQL } from '@/lib/api'
import MultiSelect from 'react-select'
import { Select , Text } from 'opub-ui'

export function Content({ timePeriod, indicator }: { timePeriod: string; indicator: string }) {
	const [region, setRegion] = React.useState<any>([])
	const [boundary, setBoundary] = React.useState<any>('revenue-circle')

	const geographyMap: any = {
		'revenue-circle': 'REVENUE CIRCLE',
		district: 'DISTRICT',
	}

	const revenueMapData = useQuery(
		[`revenue_map_data_${indicator}_${timePeriod}`],
		() =>
			GraphQL('analytics', ANALYTICS_REVENUE_MAP_DATA, {
				indcFilter: { slug: indicator },
				dataFilter: { dataPeriod: timePeriod },
			}),
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		}
	)

	const geographiesData = useQuery(
		[`geographies_data_${boundary}`],
		() =>
			GraphQL('analytics', ANALYTICS_GEOGRAPHY_DATA, {
				filters: { type: geographyMap[boundary] },
			}),
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		}
	)

	const DropdownOptions: { label: string; value: string }[] = []

	if (geographiesData) {
		geographiesData.data?.geography.forEach((geography) => {
			DropdownOptions.push({
				label: geography.name,
				value: geography.code ? geography.code : 'NA',
			})
		})
	}

	return (
		<React.Fragment>
			<div className='flex gap-4 justify-between mb-4 items-center'>
				<Select
					defaultValue='revenue-circle'
					label='Select Boundary'
					value={boundary}
					name='boundary-select'
					onChange={setBoundary}
					options={[
						{
							label: 'Revenue Circle',
							value: 'revenue-circle',
						},
						{
							label: 'District',
							value: 'district',
						},
					]}
				/>
				<div className='flex flex-col gap-2'>
					<label><Text>Select one or more Region</Text></label>
					<MultiSelect
						className='w-[450px] z-max'
						name='select-1'
						isMulti
						value={region}
						onChange={setRegion}
						options={DropdownOptions}
					/>
				</div>
			</div>
			<MapComponent
				indicator={indicator}
        regions={region}
				revenueDataloading={revenueMapData?.isFetching}
				revenueData={revenueMapData?.data?.revCircleMapData}
			/>
		</React.Fragment>
	)
}
