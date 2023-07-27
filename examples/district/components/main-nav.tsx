'use client';

import React from 'react';
import Link from 'next/link';
import { useKeyDetect } from '@/hooks/use-key-detect';
import { Icon, Text, TextField } from 'opub-ui';
import { IconSource } from 'opub-ui/src/types/icon';

import { navbarConfig } from '@/config/site';
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
    <nav className="bg-surface py-2 shadow-top-bar sm:py-3">
      <div className="container">
        <div className="flex gap-1 items-center justify-center flex-wrap sm:justify-between">
          <Link href={navbarConfig.homeUrl}>
            <div className="flex items-center gap-0.5">
              <Icon source={Icons.logo} color="decorative4" size="6" />
              <Text variant="headingLg" as="span">
                Morigaon{' '}
                <Text variant="headingSm" color="subdued">
                  (Assam)
                </Text>
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
          <div className="flex items-center shrink-0 gap-3 flex-wrap sm:gap-5">
            {navbarConfig.links.map((link) => (
              <ExploreLink
                key={link.label}
                href={link.href}
                icon={link.icon}
                text={link.label}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

const ExploreLink = ({
  href,
  icon,
  text,
}: {
  href: string;
  icon: IconSource;
  text: string;
}) => {
  return (
    <Link href={href}>
      <div className="flex gap-1 py-2 px-2 rounded-1 hover:bg-surfaceHovered sm:px-3">
        <Icon color="base" source={icon} />
        <Text variant="bodyMd" fontWeight="medium">
          {text}
        </Text>
      </div>
    </Link>
  );
};
