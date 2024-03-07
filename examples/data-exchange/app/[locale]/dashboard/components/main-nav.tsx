'use client';

import React from 'react';
import Link from 'next/link';
import { useKeyDetect } from '@/hooks/use-key-detect';
import { Avatar, Icon, Text, TextField } from 'opub-ui';

import { Icons } from '@/components/icons';

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
      <div className="flex items-center justify-between gap-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Icon source={Icons.logo} size={24} color="success" />
            <Text variant="headingLg" as="h1">
              OPub
            </Text>
          </div>
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
        <div className="flex shrink-0 items-center gap-4">
          <Icon source={Icons.notification} />
          <div>
            <Avatar showInitials showLabel name="Helen Birjam" size="small" />
          </div>
        </div>
      </div>
    </nav>
  );
}
