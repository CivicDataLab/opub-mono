'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { graphql } from '@/gql';
import { Button, Icon, SkeletonDisplayText, Text } from '@opub-cdl/ui/src';
import { useQuery } from '@tanstack/react-query';

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
      <div className="flex mt-4">
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
        <Link href="/dataset">
          <Icon source={Icons.back} color="base" size="8" />
          <Text visuallyHidden>Go to dataset listing page</Text>
        </Link>

        <div className="flex items-center gap-2">
          {title ? (
            <Text variant="headingLg" as="h2">
              {title}
            </Text>
          ) : (
            <div className="min-w-[120px]">
              <SkeletonDisplayText />
            </div>
          )}

          <Text color="subdued">ID #{id}</Text>
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
    <ul>
      {links.map((link) => (
        <li key={link.url}>
          <Link
            className={cn(
              'rounded-l-05 p-3 block relative w-full text-textSubdued min-w-[10rem]',
              'hover:text-text focus:text-text',
              link.selected &&
                'bg-surface shadow-faint text-text pointer-events-none',
              link.disabled && 'pointer-events-none text-textDisabled'
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
                'bg-transparent rounded-l-1 w-[3px] h-full absolute right-0 top-0',
                link.selected && 'bg-decorativeIconFour'
              )}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
