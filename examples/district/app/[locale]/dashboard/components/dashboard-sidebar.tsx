'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
        {items.map((item) => {
          return (
            item.href && (
              <Link key={item.href + path} href={`${item.href}`}>
                <div className={cn('flex justify-between relative')}>
                  <span
                    className={cn(
                      'bg-transparent rounded-r-2 w-[6px] h-full absolute top-0 left-[-3px]',
                      isActive(path, item.href) && 'bg-decorativeIconFour'
                    )}
                  />
                  <div
                    className={cn(
                      'flex items-center w-full ml-2 rounded-1 overflow-hidden',
                      styles.Item,
                      isActive(path, item.href) && styles.Selected
                    )}
                  >
                    {item.icon && (
                      <div className="basis-5 pl-3">
                        <Icon source={Icons[item.icon]} color="base" />
                      </div>
                    )}

                    <div
                      className={cn(
                        'py-[6px] px-2 max-w-[220px]',
                        'whitespace-nowrap opacity-100 transition-opacity duration-300'
                      )}
                    >
                      {/* somehow the active styles are not applying in production
                          it only happens on hard refresh and only for home page,
                          this is a hotfix for that
                      */}
                      {isActive(path, item.href) && <div></div>}
                      <Text truncate fontWeight="medium">
                        {item.title}
                      </Text>
                    </div>
                  </div>
                </div>
              </Link>
            )
          );
        })}
      </nav>
    </aside>
  );
}

export function isActive(path: string, href: string) {
  if (href !== '/') {
    return path.startsWith(href);
  }

  if (path === '/') {
    return true;
  }

  return false;
}
