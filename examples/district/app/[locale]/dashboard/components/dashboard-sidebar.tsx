'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useKeyDetect } from '@/hooks/use-key-detect';
import { Icon, Text } from 'opub-ui';
import { twMerge } from 'tailwind-merge';

import { SidebarNavItem } from 'types';
import { Icons } from '@/components/icons';
import styles from '../dashboard.module.scss';

interface DashboardNavProps {
  items: SidebarNavItem[];
}
export function DashboardSidebar({ items }: DashboardNavProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { key, metaKey } = useKeyDetect();
  const path = usePathname();

  React.useEffect(() => {
    if (key === 'b' && metaKey) {
      setIsCollapsed(!isCollapsed);
    }
  }, [key]);

  if (items && !items.length) {
    return null;
  }

  // const sidebarIcon = isCollapsed ? Icons.expand : Icons.collapse;
  return (
    <aside
      className={twMerge(
        'pt-5 pr-2 overflow-hidden bg-surface',
        'hidden z-1 shadow-inset basis-[240px] shrink-0 md:block',
        isCollapsed && 'basis-[60px]',
        styles.Collapse
      )}
    >
      <nav className={twMerge('flex flex-col gap-2')}>
        {items.map((item) => {
          return (
            item.href && (
              <Link key={item.href} href={item.disabled ? '/' : item.href}>
                <div className={twMerge('flex justify-between relative')}>
                  <span
                    className={twMerge(
                      'bg-transparent rounded-r-2 w-[6px] h-full absolute top-0 left-[-3px]',
                      path === item.href && 'bg-decorativeIconFour'
                    )}
                  />
                  <div
                    className={twMerge(
                      'flex items-center w-full ml-2 rounded-1 overflow-hidden',
                      styles.Item,
                      path === item.href && styles.Selected,
                      isCollapsed && styles.Collapsed
                    )}
                  >
                    {item.icon && (
                      <div className="basis-5 pl-3">
                        <Icon source={Icons[item.icon]} color="base" />
                      </div>
                    )}

                    <div
                      className={twMerge(
                        'py-[6px] px-2 max-w-[220px]',
                        'whitespace-nowrap opacity-100 transition-opacity duration-300',
                        isCollapsed && 'opacity-0'
                      )}
                    >
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
