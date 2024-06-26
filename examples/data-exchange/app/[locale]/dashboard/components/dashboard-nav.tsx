'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, IconButton, Text, Tooltip } from 'opub-ui';
import { useMetaKeyPress } from 'opub-ui/utils';

import { SidebarNavItem } from 'types';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import styles from '../dashboard.module.scss';

interface DashboardNavProps {
  items: SidebarNavItem[];
}
export function DashboardNav({ items }: DashboardNavProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const path = usePathname();

  useMetaKeyPress('b', () => setIsCollapsed((e) => !e));

  if (items && !items.length) {
    return null;
  }

  const sidebarIcon = isCollapsed ? Icons.expand : Icons.collapse;
  return (
    <aside
      className={cn(
        'overflow-hidden bg-surfaceDefault pr-2 pt-2',
        'z-1 hidden shrink-0 basis-[240px] shadow-insetBasic md:block',
        isCollapsed && 'basis-[60px]',
        styles.Collapse
      )}
    >
      <nav className={cn('flex flex-col gap-2')}>
        <div className="w-fit self-end">
          <IconButton
            size="slim"
            icon={sidebarIcon}
            withTooltip
            tooltipSide="right"
            onClick={() => setIsCollapsed((open) => !open)}
          >
            {isCollapsed ? 'Expand' : 'Collapse'} Sidebar
          </IconButton>
        </div>

        {items.map((item) => {
          const icon = Icons[item.icon || 'arrowRight'];
          const isSelected = path.includes(item.href as string);
          return (
            item.href && (
              <Link key={item.href} href={item.disabled ? '/' : item.href}>
                <div className={cn('relative flex justify-between')}>
                  <span
                    className={cn(
                      'absolute left-0 top-0 h-full w-[3px] rounded-r-1 bg-transparent',
                      isSelected && 'bg-borderSuccessDefault'
                    )}
                  />
                  <div
                    className={cn(
                      'ml-2 flex  w-full items-center overflow-hidden rounded-1',
                      styles.Item,
                      isSelected && styles.Selected,
                      isCollapsed && styles.Collapsed
                    )}
                  >
                    <Tooltip
                      side="right"
                      content={isCollapsed ? item.title : undefined}
                    >
                      <div className="basis-5 px-3 py-2">
                        <Icon
                          source={icon}
                          color={isSelected ? 'success' : 'default'}
                        />
                      </div>
                    </Tooltip>
                    <div
                      className={cn(
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
