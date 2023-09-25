'use client';

import { MainConfig } from '@/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Text } from 'opub-ui';
import React from 'react';

export function MainNav({ data }: { data: MainConfig }) {
  const { district } = useParams();

  return (
    <header className="relative bg-backgroundDark text-lightmodeIndigoSolid2 py-3 px-10 shadow-top-bar sm:py-3 z-2 ">
      <div className="flex gap-1 items-center justify-between flex-wrap sm:justify-between">
        <Link href={data.homeUrl}>
          <div className="flex items-center gap-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle opacity="0.16" cx="12" cy="12" r="12" fill="#AA99EC" />
            </svg>
            <Text variant="headingSmSpaced" as="span" color="inherit">
              ASSAM DISTRICT DASHBOARD
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
export function capitalizeDistrictName(district: string) {
  return district
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
