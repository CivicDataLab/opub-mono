import { ComplexAction } from '../../../../types/button'
import { Box } from '../../../Box'
import { buttonsFrom } from '../../../Button/utils'
import React from 'react'

export interface FooterProps {
	/** Primary action */
	primaryAction?: ComplexAction
	/** Collection of secondary actions */
	secondaryActions?: ComplexAction[]
	/** The content to display inside modal */
	children?: React.ReactNode
}

export function Footer({
	primaryAction,
	secondaryActions,
	children,
}: FooterProps) {
	const primaryActionButton =
		(primaryAction && buttonsFrom(primaryAction)) || null
	const secondaryActionButtons =
		(secondaryActions && buttonsFrom(secondaryActions)) || null
	const actions =
		primaryActionButton || secondaryActionButtons ? (
			<Box
				flex
				gap="2"
				wrap="wrap"
				alignItems="center"
				justifyContent="space-between"
			>
				{secondaryActionButtons}
				{primaryActionButton}
			</Box>
		) : null

	return (
		<Box flex gap="4" alignItems="center">
			<Box
				borderBlockStart="divider"
				minHeight="var(--space-16)"
				padding="4"
				width="100%"
			>
				<Box
					flex
					wrap="wrap"
					gap="4"
					alignItems="center"
					justifyContent="space-between"
				>
					<Box>{children}</Box>
					{actions}
				</Box>
			</Box>
		</Box>
	)
}
