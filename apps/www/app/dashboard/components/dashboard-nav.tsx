'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useKeyDetect } from '@/hooks/use-key-detect';
import { useKeyPress } from '@/hooks/use-key-press';
import { Button, Icon, Text, Tooltip } from '@opub-cdl/ui';
import { twMerge } from 'tailwind-merge';

import { SidebarNavItem } from 'types';
import { Icons } from '@/components/icons';
import styles from '../dashboard.module.scss';

interface DashboardNavProps {
  items: SidebarNavItem[];
}
export function DashboardNav({ items }: DashboardNavProps) {
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

  const sidebarIcon = isCollapsed ? Icons.expand : Icons.collapse;
  return (
    <aside
      className={twMerge(
        'h-full pt-2 pr-2 bg-surfaceDefault overflow-hidden',
        'hidden z-1 shadow-inset basis-[240px] sm:block',
        isCollapsed && 'basis-[60px]',
        styles.Collapse
      )}
    >
      <nav className={twMerge('flex flex-col gap-2')}>
        <div className="w-fit self-end">
          <Tooltip
            side="right"
            content={`${isCollapsed ? 'Expand' : 'Collapse'} Sidebar`}
          >
            <Button
              icon={<Icon source={sidebarIcon} />}
              accessibilityLabel={`${
                isCollapsed ? 'Expand' : 'Collapse'
              } Sidebar`}
              plain
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          </Tooltip>
        </div>

        {items.map((item) => {
          const icon = Icons[item.icon || 'arrowRight'];
          return (
            item.href && (
              <Link key={item.href} href={item.disabled ? '/' : item.href}>
                <div className={twMerge('flex justify-between relative')}>
                  <span
                    className={twMerge(
                      'bg-transparent rounded-r-1 w-[3px] h-full absolute top-0 left-0',
                      path.includes(item.href) && 'bg-decorativeIconFour'
                    )}
                  />
                  <div
                    className={twMerge(
                      'flex items-center  w-full ml-2 rounded-1 overflow-hidden',
                      styles.Item,
                      path.includes(item.href) && styles.Selected,
                      isCollapsed && styles.Collapsed
                    )}
                  >
                    <Tooltip
                      side="right"
                      content={isCollapsed ? item.title : undefined}
                    >
                      <div className="basis-5 py-2 px-3">
                        <Icon source={icon} />
                      </div>
                    </Tooltip>
                    <div
                      className={twMerge(
                        'py-2 pr-3',
                        'whitespace-nowrap opacity-100 transition-opacity duration-300',
                        isCollapsed && 'opacity-0'
                      )}
                    >
                      <Text fontWeight="medium">{item.title}</Text>
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
