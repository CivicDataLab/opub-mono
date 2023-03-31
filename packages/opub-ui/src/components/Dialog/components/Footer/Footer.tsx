import { Box } from '../../../Box';
import { buttonsFrom } from '../../../Button/utils';
import { Flex } from '../../../Flex';
import { ComplexAction } from '../../../../types/button';
import React from 'react';

export interface FooterProps {
  /** Primary action */
  primaryAction?: ComplexAction;
  /** Collection of secondary actions */
  secondaryActions?: ComplexAction[];
  /** The content to display inside modal */
  children?: React.ReactNode;
}

export function Footer({
  primaryAction,
  secondaryActions,
  children,
}: FooterProps) {
  const primaryActionButton =
    (primaryAction && buttonsFrom(primaryAction, { primary: true })) || null;
  const secondaryActionButtons =
    (secondaryActions && buttonsFrom(secondaryActions)) || null;
  const actions =
    primaryActionButton || secondaryActionButtons ? (
      <Flex
        gap="var(--space-2)"
        wrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        {secondaryActionButtons}
        {primaryActionButton}
      </Flex>
    ) : null;

  return (
    <Flex gap="var(--space-4)" alignItems="center">
      <Box
        borderBlockStart="divider"
        minHeight="var(--space-16)"
        padding="4"
        width="100%"
      >
        <Flex
          wrap="wrap"
          gap="var(--space-4)"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>{children}</Box>
          {actions}
        </Flex>
      </Box>
    </Flex>
  );
}
