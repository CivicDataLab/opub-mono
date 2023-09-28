'use client';

import styles from './Content.module.scss';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Text, IconButton } from 'opub-ui';
import React from 'react';
import { SidebarNavItem } from 'types';

interface DashboardNavProps {
  items: SidebarNavItem[];
}
export function DashboardSidebar({ items }: DashboardNavProps) {
  const path = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { district, department } = useParams();

  if (items && !items.length) {
    return null;
  }

  return (
    <aside
      className={cn(
        'pt-4 overflow-hidden bg-backgroundDefault shadow-insetBasic ',
        'hidden z-1 basis-[240px] shrink-0 md:block',
        isCollapsed && 'basis-[24px]',
        styles.Collapse
      )}
    >
      <nav className={cn('flex flex-col gap-2 relative')}>
        <Text
          className={cn(
            'py-2 px-4 z-max text-lightmodeGraySlateSolid11',
            isCollapsed && 'hidden'
          )}
          variant="headingSmSpaced"
        >
          {district}
        </Text>
        <IconButton
          className={cn(
            'absolute right-[-16px] p-2 rounded-full z-max shadow-insetBasic hover:bg-lightmodeIndigoAlpha3 bg-lightmodePureWhite',
            isCollapsed && styles.BtnRotate
          )}
          color="highlight"
          icon={Icons.doubleLeft}
          onClick={() => setIsCollapsed((e) => !e)}
        >
          Collapse Sidebar
        </IconButton>
        <div className={isCollapsed && 'hidden'}>
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
            'flex items-center w-full mx-2 rounded-1 overflow-hidden hover:bg-lightmodeIndigoAlpha3',
            styles.Item,
            isActive(department, href, district) &&
              'bg-lightmodeIndigoAlpha4 text-lightmodeVioletAlpha11 hover:bg-lightmodeIndigoAlpha4'
          )}
        >
          <div
            className={cn(
              'p-2 max-w-[220px]',
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
