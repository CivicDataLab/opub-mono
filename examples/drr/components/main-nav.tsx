'use client';

import { MainConfig } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Text } from 'opub-ui';
import React from 'react';

export function MainNav({ data }: { data: MainConfig }) {
  const { district } = useParams();

  return (
    <header className="hidden md:block relative bg-backgroundSolidDark text-baseIndigoSolid2 py-3 px-10 shadow-top-bar sm:py-3 z-2 ">
      <div className="flex gap-1 items-center justify-between flex-wrap sm:justify-between">
        <Link href={data.homeUrl}>
          <div className="flex items-center gap-4">
            <Image src="/logo/logo-min.svg" alt="" width={24} height={24} />
            <Text variant="headingSmSpaced" as="span" color="inherit">
              D4D ASSAM: DISTRICT DASHBOARD
            </Text>
          </div>
        </Link>

        <Text variant="bodyLg" as="span" color="inherit">
          {capitalizeDistrictName(district)}
        </Text>
      </div>
    </header>
  );
}

// function to deslug and capitalize the district name
export function capitalizeDistrictName(district: any) {
  return district
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
