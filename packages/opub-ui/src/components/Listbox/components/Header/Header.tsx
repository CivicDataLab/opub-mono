import { Box } from '@ui/components/Box';
import { Text } from '@ui/components/Text';
import React, { ReactNode } from 'react';
import { useSection } from '../Section';

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps) {
  const sectionId = useSection() || '';

  const content =
    typeof children === 'string' ? (
      <Box
        paddingBlockStart="2"
        paddingInlineStart="4"
        paddingBlockEnd="2"
        paddingInlineEnd="4"
      >
        <Text as="span" variant="headingXs" color="subdued">
          {children}
        </Text>
      </Box>
    ) : (
      children
    );

  return (
    <div aria-hidden id={sectionId}>
      {content}
    </div>
  );
}
