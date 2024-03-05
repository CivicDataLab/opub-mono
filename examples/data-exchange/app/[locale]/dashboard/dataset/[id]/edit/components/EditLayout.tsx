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
    <div className="mt-8 flex h-full flex-col">
      <Header id={params.id} title={data?.dataset?.title} />
      <div className="mt-4 flex flex-col lg:flex-row">
        <div>
          <Navigation id={params.id} pathItem={pathItem} />
        </div>
        <div className="bg-surface shadow-card border-l-divider rounded-tl-none max-w-[994px] flex-grow px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}

const Header = ({ id, title }: { id: string; title?: string }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <Link href="/dashboard/dataset">
          <Icon source={Icons.back} size={32} />
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
      <Button url={`/dashboard/dataset/${id}/edit`} kind="tertiary">
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
    <ul className="flex max-w-[90vw] overflow-x-auto lg:block lg:max-w-full lg:overflow-x-visible">
      {links.map((link) => (
        <li
          className={cn(
            link.disabled &&
              'cursor-no-drop text-textDisabled hover:text-textDisabled focus:text-textDisabled'
          )}
          key={link.url}
        >
          <Link
            className={cn(
              'relative block w-full rounded-l-05 p-3 text-center text-textSubdued lg:min-w-[10rem]',
              'lg:text-start',
              'hover:text-textDefault focus:text-textDefault',
              link.selected &&
                'pointer-events-none bg-surfaceDefault text-textDefault shadow-insetBasic',
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
                'absolute bottom-0 right-0 h-[3px] w-full',
                'right-0 bg-transparent lg:top-0 lg:h-full lg:w-[3px] lg:rounded-l-1',
                link.selected && 'bg-decorativeIconFour'
              )}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
