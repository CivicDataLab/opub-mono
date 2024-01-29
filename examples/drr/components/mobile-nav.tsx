'use client';

import React from 'react';
import Link from 'next/link';
import { useKeyDetect } from '@/hooks/use-key-detect';
import { MainConfig } from '@/types';
import { platformName } from '@/config/consts';
import { Icon, Text } from 'opub-ui';

import { Icons } from '@/components/icons';

export function MobileNav({ data }: { data: MainConfig }) {
  const { key, metaKey } = useKeyDetect();
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (key === 'k' && metaKey) {
      searchRef.current?.focus();
    }
  }, [key, metaKey]);

  return (
    <header className="bg-backgroundSolidDark shadow-elementTopNav py-3 px-6 shadow-top-bar sm:py-3 z-2 relative">
      <div className="flex gap-1 items-center justify-center flex-wrap sm:justify-between">
        <div className="flex items-center gap-1">
          <Link href={data.homeUrl}>
            <div className="flex items-center gap-2">
              <Icon source={Icons.logo} color="default" size={6}/>
              <div className="flex flex-col gap-1">
              <Text variant="headingLg" as="span">
                <span className="text-textOnBGDefault capitalize">
                  {platformName}{' '}
                </span>
              </Text>
              <Text variant="bodySm" as="span" fontWeight="semibold" className="ml-16">
                <span className="text-textOnBGDefault capitalize">
                for Disaster Risk Reduction
                </span>
              </Text>
              </div>
            </div>
          </Link>
        </div>

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
    </header>
  );
}

const ExploreLink = ({
  href,
  icon,
  text,
}: {
  href: string;
  icon: string;
  text: string;
}) => {
  return (
    <Link href={href}>
      <div className="flex gap-1 py-2 px-2 rounded-1 hover:bg-surfaceHovered sm:px-3">
        {Icons[icon] && <Icon color="default" source={Icons[icon]} />}
        <Text variant="bodyMd" fontWeight="medium" className="text-textOnBGDefault">
          {text}
        </Text>
      </div>
    </Link>
  );
};
