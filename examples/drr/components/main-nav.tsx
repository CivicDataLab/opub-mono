'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useKeyDetect } from '@/hooks/use-key-detect';
import { usePRouter } from '@/hooks/use-prouter';
import { MainConfig } from '@/types';
import { platformName } from '@/config/consts';
import { Icon, IconButton, Menu, Text } from 'opub-ui';

import { Icons } from '@/components/icons';

export function MainNav({ data }: { data: MainConfig }) {
  const { key, metaKey } = useKeyDetect();
  const searchRef = React.useRef<HTMLInputElement>(null);
  const { district } = useParams();

  React.useEffect(() => {
    if (key === 'k' && metaKey) {
      searchRef.current?.focus();
    }
  }, [key]);

  return (
    <header className="bg-surface py-3 px-6 shadow-top-bar sm:py-3 z-2 relative">
      <div className="flex gap-1 items-center justify-center flex-wrap sm:justify-between">
        <div className="flex items-center gap-1">
          <Link href={data.homeUrl}>
            <div className="flex items-center gap-2">
              <Icon source={Icons.logo} color="decorative4" size="6" />
              <Text variant="headingLg" as="span">
                <span className="capitalize">
                  {district ? district : platformName}{' '}
                </span>
              </Text>
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
        {Icons[icon] && <Icon color="base" source={Icons[icon]} />}
        <Text variant="bodyMd" fontWeight="medium">
          {text}
        </Text>
      </div>
    </Link>
  );
};

function DistrictSelector() {
  const router = usePRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <Menu
      open={open}
      onOpenChange={setOpen}
      items={[
        {
          content: 'Morigaon',
          onAction: () => {
            setOpen(false);
            router.push('/morigaon');
          },
        },
        {
          content: 'Nagaon',
          onAction: () => {
            setOpen(false);
            router.push('/nagaon');
          },
        },
      ]}
      trigger={<IconButton icon={Icons.down}>change district</IconButton>}
    />
  );
}
