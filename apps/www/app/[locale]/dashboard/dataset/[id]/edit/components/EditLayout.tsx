'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { graphql } from '@/gql';
import { useQuery } from '@tanstack/react-query';
import { Button, Icon, SkeletonDisplayText, Text } from 'opub-ui';

import { GraphQL } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

const datasetQueryDoc = graphql(`
  query datasetQueryLayout($dataset_id: Int) {
    dataset(dataset_id: $dataset_id) {
      id
      title
    }
  }
`);

interface LayoutProps {
  children?: React.ReactNode;
  params: { id: string };
}

const layoutList = ['metadata', 'distribution', 'review', 'publish'];

export function EditLayout({ children, params }: LayoutProps) {
  const { data } = useQuery([`dataset_layout_${params.id}`], () =>
    GraphQL(datasetQueryDoc, { dataset_id: Number(params.id) })
  );

  const pathName = usePathname();

  const pathItem = layoutList.find(function (v) {
    return pathName.indexOf(v) >= 0;
  });

  // if not from the layoutList, return children
  if (!pathItem) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-full mt-8">
      <Header id={params.id} title={data?.dataset?.title} />
      <div className="flex flex-col mt-4 lg:flex-row">
        <div>
          <Navigation id={params.id} pathItem={pathItem} />
        </div>
        <div className="flex-grow max-w-[994px] py-4 px-6 bg-surface shadow-card border-l-divider rounded-tl-none">
          {children}
        </div>
      </div>
    </div>
  );
}

const Header = ({ id, title }: { id: string; title?: string }) => {
  return (
    <div className="flex gap-4 flex-wrap items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center">
        <Link href="/dashboard/dataset">
          <Icon source={Icons.back} color="base" size="8" />
          <Text visuallyHidden>Go to dataset listing page</Text>
        </Link>

        <div className="flex items-center gap-2">
          {title ? (
            <div className="text-clamp">
              <Text variant="headingLg" as="h2">
                {title}
              </Text>
            </div>
          ) : (
            <div className="min-w-[120px]">
              <SkeletonDisplayText />
            </div>
          )}
          <div className="whitespace-nowrap">
            <Text color="subdued">ID #{id}</Text>
          </div>
        </div>
      </div>
      <Button url={`/dashboard/dataset/${id}/edit`} plain>
        Edit Info
      </Button>
    </div>
  );
};

const Navigation = ({ id, pathItem }: { id: string; pathItem: string }) => {
  const links = [
    {
      label: 'Metadata',
      url: `/dashboard/dataset/${id}/edit/metadata`,
      selected: pathItem === 'metadata',
    },
    {
      label: 'Distributions',
      url: `/dashboard/dataset/${id}/edit/distribution`,
      selected: pathItem === 'distribution',
    },
    {
      label: 'Review',
      url: `/dashboard/dataset/${id}/edit/review`,
      disabled: true,
      selected: pathItem === 'review',
    },
  ];

  return (
    <ul className="flex overflow-x-auto max-w-[90vw] lg:block lg:overflow-x-visible lg:max-w-full">
      {links.map((link) => (
        <li
          className={cn(
            link.disabled &&
              'text-textDisabled cursor-no-drop hover:text-textDisabled focus:text-textDisabled'
          )}
          key={link.url}
        >
          <Link
            className={cn(
              'rounded-l-05 p-3 block relative w-full text-textSubdued lg:min-w-[10rem] text-center',
              'lg:text-start',
              'hover:text-text focus:text-text',
              link.selected &&
                'bg-surface shadow-faint text-text pointer-events-none',
              link.disabled && 'pointer-events-none'
            )}
            href={link.url}
          >
            <Text
              variant="bodyLg"
              fontWeight={link.selected ? 'medium' : 'regular'}
              color="inherit"
            >
              {link.label}
            </Text>
            <span
              className={cn(
                'h-[3px] w-full absolute right-0 bottom-0',
                'bg-transparent lg:rounded-l-1 lg:w-[3px] lg:h-full right-0 lg:top-0',
                link.selected && 'bg-decorativeIconFour'
              )}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
