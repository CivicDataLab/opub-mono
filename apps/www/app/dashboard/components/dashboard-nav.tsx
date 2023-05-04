'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, Text } from '@opub-cdl/ui/src';
import { twMerge } from 'tailwind-merge';

import { SidebarNavItem } from 'types';
import { Icons } from '@/components/icons';
import styles from '../dashboard.module.scss';

interface DashboardNavProps {
  items: SidebarNavItem[];
}
export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (items && !items.length) {
    return null;
  }

  return (
    <nav className="flex flex-col gap-2">
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
                    'flex gap-2 py-2 px-3 w-full ml-2 rounded-1',
                    styles.Item,
                    path.includes(item.href) && styles.Selected
                  )}
                >
                  <Icon source={icon} />
                  <Text fontWeight="medium">{item.title}</Text>
                </div>
              </div>
            </Link>
          )
        );
      })}
    </nav>
  );
}
