'use client';

import { Icons } from '@/components/icons';
import { useKeyDetect } from '@/hooks/use-key-detect';
import Link from 'next/link';
import { Avatar, Box, Icon, Text, TextField } from 'opub-ui';
import React from 'react';

export function MainNav() {
  const { key, metaKey } = useKeyDetect();
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (key === 'k' && metaKey) {
      searchRef.current?.focus();
    }
  }, [key, metaKey]);

  return (
    <nav>
      <Box flex justifyContent="space-between" gap="4" alignItems="center">
        <Link href="/">
          <Box flex alignItems="center" gap="2">
            <Icon source={Icons.logo} size={24} />
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
          <Icon source={Icons.notification} />
          <div>
            <Avatar showInitials showLabel name="Helen Birjam" size="small" />
          </div>
        </div>
      </Box>
    </nav>
  );
}
