'use client';

import React from 'react';
import Link from 'next/link';
import { useKeyDetect } from '@/hooks/use-key-detect';
import { Avatar, Box, Icon, Text, TextField } from 'opub-ui';

import { Icons } from '@/components/icons';

export function MainNav() {
  const { key, metaKey } = useKeyDetect();
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (key === 'k' && metaKey) {
      searchRef.current?.focus();
    }
  }, [key]);

  return (
    <nav>
      <Box flex justifyContent="space-between" gap="4" alignItems="center">
        <Link href="/">
          <Box flex alignItems="center" gap="2">
            <Icon source={Icons.logo} color="decorative4" size="6" />
            <Text variant="headingLg" as="h1">
              OPub
            </Text>
          </Box>
        </Link>
        <div className="hidden w-full max-w-[578px] md:block">
          <TextField
            prefix={<Icon source={Icons.search} />}
            placeholder="Search"
            name="Search"
            label="Search"
            labelHidden
            ref={searchRef}
          />
        </div>
        <div className="flex items-center shrink-0 gap-4">
          <Icon color="base" source={Icons.notification} />
          <div>
            <Avatar showInitials showLabel name="Helen Birjam" size="small" />
          </div>
        </div>
      </Box>
    </nav>
  );
}
