'use client';

import styles from './Content.module.scss';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Text } from 'opub-ui';
import React from 'react';
import { SidebarNavItem } from 'types';

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
        'pt-4 bg-backgroundSolidDefault shadow-insetBasic min-h-[calc(100vh_-_50px)]',
        'hidden z-1 basis-[240px] shrink-0 md:block overflow-hidden',
        isCollapsed && 'basis-[24px]',
        styles.Collapse
      )}
    >
      <nav className={cn('flex flex-col gap-2 relative')}>
        <Text
          className={cn(
            'py-2 px-4 z-max text-baseGraySlateSolid11',
            isCollapsed && 'hidden'
          )}
          variant="headingSmSpaced"
        >
          {district}
        </Text>

        <div
          className={cn('flex flex-col gap-2 mt-2', isCollapsed && 'hidden')}
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
  department: string;
  district?: string;
}) => {
  return (
    <Link key={href + title} href={href}>
      <div className={cn('flex justify-between relative')}>
        <span
          className={cn(
            'bg-transparent rounded-r-2 w-[6px] h-full absolute top-0 left-[-3px]',
            isActive(department, href, district) && 'bg-borderHighlightDefault'
          )}
        />
        <div
          className={cn(
            'flex items-center w-full mx-2 rounded-1 hover:bg-baseIndigoAlpha3',
            styles.Item,
            isActive(department, href, district) &&
              'bg-baseIndigoAlpha4 text-baseVioletAlpha11 hover:bg-baseIndigoAlpha4'
          )}
        >
          <div
            className={cn(
              'px-2 py-3 max-w-[220px]',
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

export function isActive(department: string, href: string, district?: string) {
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
