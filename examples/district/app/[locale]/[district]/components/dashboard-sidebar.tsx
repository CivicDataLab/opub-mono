'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Text } from 'opub-ui';

import { SidebarNavItem } from 'types';
import { cn } from '@/lib/utils';
import styles from './Content.module.scss';

interface DashboardNavProps {
  items: SidebarNavItem[];
  isCollapsed: boolean;
}
export function DashboardSidebar({ items, isCollapsed }: DashboardNavProps) {
  const path = usePathname();
  const { district, department } = useParams();

  if (items && !items.length) {
    return null;
  }

  return (
    <aside
      className={cn(
        'min-h-[calc(100vh_-_50px)] bg-backgroundSolidDefault pt-4 shadow-insetBasic',
        'z-1 hidden shrink-0 basis-[240px] overflow-hidden md:block',
        isCollapsed && 'basis-[24px]',
        styles.Collapse
      )}
    >
      <nav className={cn('relative flex flex-col gap-2')}>
        <Text
          className={cn(
            'z-max px-4 py-2 text-baseGraySlateSolid11',
            isCollapsed && 'hidden'
          )}
          variant="headingSmSpaced"
        >
          {district}
        </Text>

        <div
          className={cn('mt-2 flex flex-col gap-2', isCollapsed && 'hidden')}
        >
          {items.map((item) => {
            return (
              item.href && (
                <SidebarLink
                  key={item.href + path}
                  href={`/${district}${item.href}`}
                  title={item.title}
                  department={department}
                />
              )
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

const SidebarLink = ({
  href,
  title,
  department,
  district,
}: {
  href: string;
  title: string;
  department: string | string[];
  district?: string;
}) => {
  return (
    <Link key={href + title} href={href}>
      <div className={cn('relative flex justify-between')}>
        <span
          className={cn(
            'absolute left-[-3px] top-0 h-full w-[6px] rounded-r-2 bg-transparent',
            isActive(department, href, district) && 'bg-borderHighlightDefault'
          )}
        />
        <div
          className={cn(
            'mx-2 flex w-full items-center rounded-1 hover:bg-baseIndigoAlpha3',
            styles.Item,
            isActive(department, href, district) &&
              'bg-baseIndigoAlpha4 text-baseVioletAlpha11 hover:bg-baseIndigoAlpha4'
          )}
        >
          <div
            className={cn(
              'max-w-[220px] px-2 py-3',
              'whitespace-nowrap opacity-100 transition-opacity duration-300'
            )}
          >
            <Text
              truncate
              variant="headingSm"
              fontWeight="medium"
              className="capitalize"
              color="inherit"
            >
              {title}
            </Text>
          </div>
        </div>
      </div>
    </Link>
  );
};

export function isActive(
  department: string | string[],
  href: string,
  district?: string | string[]
) {
  if (!department && district) {
    return true;
  }

  const hrefSplit = href.split('/');
  const sanitizedHref = hrefSplit[hrefSplit.length - 1];

  if (department === sanitizedHref) {
    return true;
  }

  return false;
}
