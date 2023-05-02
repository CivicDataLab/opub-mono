'use client';

import Link from 'next/link';
import { Avatar, Box, Icon, Text, TextField } from '@opub-cdl/ui';

import { Icons } from '@/components/icons';

export function MainNav() {
  return (
    <nav>
      <Box flex justifyContent="space-between" gap="4" alignItems="center">
        <Link href="/">
          <Box flex alignItems="center" gap="2">
            <Icon source={Icons.logo} color="interactive" />
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
          />
        </div>
        <div className="flex items-center shrink-0 gap-4">
          <Icon color="base" source={Icons.notification} />
          <div>
            <Avatar
              showInitials
              showLabel
              name="Xquenda Andreev"
              size="small"
            />
          </div>
        </div>
      </Box>
    </nav>
  );
}
