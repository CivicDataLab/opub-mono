'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { SidebarNavItem } from '@/types';
import { IconMenu, IconX } from '@tabler/icons-react';
import { Icon, Text } from 'opub-ui';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import dashboardStyles from '../dashboard.module.scss';
import styles from './styles.module.scss';

interface DashboardNavProps {
  items: SidebarNavItem[];
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}

export function MobileDashboardNav({
  isOpened,
  setIsOpened,
  items,
}: DashboardNavProps) {
  const path = usePathname();
  const asideRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(asideRef, () => {
    if (isOpened) {
      setIsOpened(false);
    }
  });

  if (items && !items.length) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpened(!isOpened);
        }}
        className={cn(styles.NavButton, isOpened && styles.NavButtonOpen)}
      >
        <Icon source={isOpened ? IconX : IconMenu} />
        <Text visuallyHidden>Trigger Menu</Text>
      </button>
      <aside
        ref={asideRef}
        className={cn(styles.Aside, isOpened && styles.AsideOpen)}
      >
        <nav className={styles.MobileNavContainer}>
          <ul>
            {items.map((item) => {
              const icon = Icons[item.icon || 'arrowRight'];
              return (
                item.href && (
                  <Link
                    key={item.href}
                    href={item.disabled ? '/' : item.href}
                    onClick={() => setIsOpened(false)}
                  >
                    <div className={twMerge('flex justify-between relative')}>
                      <span
                        className={twMerge(
                          'bg-transparent rounded-r-1 w-[3px] h-full absolute top-0 left-0',
                          path.includes(item.href) && 'bg-decorativeIconFour'
                        )}
                      />
                      <div
                        className={twMerge(
                          'flex items-center pl-2 w-full ml-2 rounded-1 overflow-hidden',
                          dashboardStyles.Item,
                          path.includes(item.href) && dashboardStyles.Selected
                        )}
                      >
                        <Icon source={icon} />
                        <div
                          className={twMerge(
                            'py-2 px-3',
                            'whitespace-nowrap opacity-100 transition-opacity duration-300'
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
          </ul>
        </nav>
      </aside>
    </>
  );
}
