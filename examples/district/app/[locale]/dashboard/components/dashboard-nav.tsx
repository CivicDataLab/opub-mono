'use client';

import { Icons } from '@/components/icons';
import { useKeyDetect } from '@/hooks/use-key-detect';
import Link from 'next/link';
import { Avatar, Box, Icon, SearchInput, Text, TextField } from 'opub-ui';
import React from 'react';

export function DashboardNav() {
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
            <Icon source={Icons.logo} size={24} />
            <Text variant="headingLg" as="h1">
              OPub
            </Text>
          </Box>
        </Link>
        <div className="hidden w-full max-w-[578px] md:block">
          <SearchInput name="Search" label="Search" ref={searchRef} />
        </div>
        <div className="flex items-center shrink-0 gap-4">
          <Icon color="default" source={Icons.notification} />
          <div>
            <Avatar showInitials showLabel name="Helen Birjam" size="small" />
          </div>
        </div>
      </Box>
    </nav>
  );
}
