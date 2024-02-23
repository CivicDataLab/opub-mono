'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MainConfig } from '@/types';
import { Text } from 'opub-ui';

export function MainNav({ data }: { data: MainConfig }) {
  const { district } = useParams();

  return (
    <header className="shadow-top-bar relative z-2 hidden bg-backgroundSolidDark px-10 py-3 text-baseIndigoSolid2 sm:py-3 md:block ">
      <div className="flex flex-wrap items-center justify-between gap-1 sm:justify-between">
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
