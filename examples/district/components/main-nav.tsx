'use client';

import React from 'react';
import Link from 'next/link';
import { useKeyDetect } from '@/hooks/use-key-detect';
import { MainConfig } from '@/types';
import { Icon, Text } from 'opub-ui';
import { IconSource } from 'opub-ui/src/types/icon';

import { Icons } from '@/components/icons';

export function MainNav({ data }: { data: MainConfig }) {
  const { key, metaKey } = useKeyDetect();
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (key === 'k' && metaKey) {
      searchRef.current?.focus();
    }
  }, [key]);

  return (
    <header className="bg-surface py-2 shadow-top-bar sm:py-3 z-2 relative">
      <div className="container">
        <div className="flex gap-1 items-center justify-center flex-wrap sm:justify-between">
          <Link href={data.homeUrl}>
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

          {data.mainNav.length > 0 && (
            <div className="flex items-center shrink-0 gap-3 flex-wrap sm:gap-5">
              {data.mainNav.map((link) => (
                <ExploreLink
                  key={link.title}
                  href={link.href || ''}
                  icon={link.icon || ''}
                  text={link.title || ''}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
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
        {icon && <Icon color="base" source={icon} />}
        <Text variant="bodyMd" fontWeight="medium">
          {text}
        </Text>
      </div>
    </Link>
  );
};
