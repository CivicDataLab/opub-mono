'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Icon, Text, Tooltip } from '@opub-cdl/ui';
import { twMerge } from 'tailwind-merge';

import { SidebarNavItem } from 'types';
import { Icons } from '@/components/icons';
import styles from '../dashboard.module.scss';

interface DashboardNavProps {
  items: SidebarNavItem[];
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}
export function DashboardNav({
  items,
  isCollapsed,
  setIsCollapsed,
}: DashboardNavProps) {
  const path = usePathname();

  if (items && !items.length) {
    return null;
  }

  const sidebarIcon = isCollapsed ? Icons.expand : Icons.collapse;
  return (
    <nav className="flex flex-col gap-2">
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
            <Tooltip
              side="right"
              content={isCollapsed ? item.title : undefined}
              key={item.href}
            >
              <Link href={item.disabled ? '/' : item.href}>
                <div className={twMerge('flex justify-between relative')}>
                  <span
                    className={twMerge(
                      'bg-transparent rounded-r-1 w-[3px] h-full absolute top-0 left-0',
                      path.includes(item.href) && 'bg-decorativeIconFour'
                    )}
                  />
                  <div
                    className={twMerge(
                      'flex gap-2 py-2 px-3 w-full ml-2 rounded-1',
                      styles.Item,
                      path.includes(item.href) && styles.Selected
                    )}
                  >
                    <div className="basis-5">
                      <Icon source={icon} />
                    </div>
                    <div
                      className={twMerge(
                        styles.CollapseText,
                        isCollapsed && 'opacity-0'
                      )}
                    >
                      <Text fontWeight="medium">{item.title}</Text>
                    </div>
                  </div>
                </div>
              </Link>
            </Tooltip>
          )
        );
      })}
    </nav>
  );
}
