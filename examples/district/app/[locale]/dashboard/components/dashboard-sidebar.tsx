'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Icon, Text } from 'opub-ui';

import { SidebarNavItem } from 'types';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import styles from '../dashboard.module.scss';

interface DashboardNavProps {
  items: SidebarNavItem[];
}
export function DashboardSidebar({ items }: DashboardNavProps) {
  const path = usePathname();
  const { district, department } = useParams();

  if (items && !items.length) {
    return null;
  }

  // const sidebarIcon = isCollapsed ? Icons.expand : Icons.collapse;
  return (
    <aside
      className={cn(
        'pt-5 pr-2 overflow-hidden bg-surface',
        'hidden z-1 shadow-inset basis-[240px] shrink-0 md:block',
        styles.Collapse
      )}
    >
      <nav className={cn('flex flex-col gap-2')}>
        <SidebarLink
          href={`/${district}`}
          title={district}
          icon={'home'}
          department={department}
          district={district}
        />
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
      </nav>
    </aside>
  );
}

const SidebarLink = ({
  href,
  title,
  icon,
  department,
  district,
}: {
  href: string;
  title: string;
  icon?: string;
  department: string;
  district?: string;
}) => {
  return (
    <Link key={href + title} href={href}>
      <div className={cn('flex justify-between relative')}>
        <span
          className={cn(
            'bg-transparent rounded-r-2 w-[6px] h-full absolute top-0 left-[-3px]',
            isActive(department, href, district) && 'bg-decorativeIconFour'
          )}
        />
        <div
          className={cn(
            'flex items-center w-full ml-2 rounded-1 overflow-hidden',
            styles.Item,
            isActive(department, href, district) && styles.Selected
          )}
        >
          {icon && (
            <div className="basis-5 pl-3">
              <Icon source={Icons[icon]} color="base" />
            </div>
          )}

          <div
            className={cn(
              'py-[6px] px-2 max-w-[220px]',
              'whitespace-nowrap opacity-100 transition-opacity duration-300'
            )}
          >
            <Text truncate fontWeight="medium" className="capitalize">
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
