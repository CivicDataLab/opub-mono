'use client'

import { cn } from '../../utils'
import styles from './Divider.module.scss'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as React from 'react'

interface SeparatorProps extends SeparatorPrimitive.SeparatorProps {
	className?: string
}

const Divider = React.forwardRef<
	React.ElementRef<typeof SeparatorPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
	(
		{
			className,
			orientation = 'horizontal',
			decorative = true,
			...props
		}: SeparatorProps,
		ref
	) => {
		return (
			<SeparatorPrimitive.Root
				ref={ref}
				decorative={decorative}
				orientation={orientation}
				className={cn(
					styles.Divider,
					orientation === 'horizontal' ? styles.Horizontal : styles.Vertical,
					className
				)}
				{...props}
			/>
		)
	}
)
Divider.displayName = SeparatorPrimitive.Root.displayName

export { Divider }
