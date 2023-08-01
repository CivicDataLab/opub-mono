'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { SidebarNavItem } from '@/types';
import { IconMenu, IconX } from '@tabler/icons-react';
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Icon,
  IconButton,
  Text,
} from 'opub-ui';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import dashboardStyles from '../dashboard.module.scss';
import { isActive } from './dashboard-sidebar';
import styles from './styles.module.scss';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export function MobileDashboardNav({ items }: DashboardNavProps) {
  const [open, setOpen] = React.useState(false);

  const path = usePathname();
  const activeItem = React.useMemo(() => {
    return items.find((item) => item.href === path);
  }, [items, path]);

  if (items && !items.length) {
    return null;
  }

  return (
    <div className="container mt-3">
      <Button fullWidth disclosure onClick={() => setOpen((e) => !e)}>
        {activeItem?.title || 'Select a department'}
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-between items-center px-3 py-2">
          <Text variant="headingMd" as="h1">
            Select a department
          </Text>
          <IconButton onClick={() => setOpen(false)} icon={IconX}>
            Close
          </IconButton>
        </div>

        <CommandInput placeholder="search..." />
        <CommandList className=" max-h-full">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Departments">
            {items.map((item) => {
              return (
                <CommandItem
                  key={item.href + item.title}
                  className={cn(
                    'flex justify-between relative',
                    isActive(path, item.href) && dashboardStyles.Selected
                  )}
                >
                  <Link
                    href={item.disabled ? '/' : item.href || '#'}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={cn(
                        'bg-transparent rounded-r-2 w-[6px] h-full absolute top-0 left-[-10px]',
                        isActive(path, item.href) && 'bg-decorativeIconFour'
                      )}
                    />
                    <div
                      className={cn(
                        'flex items-center w-full rounded-1 overflow-hidden',
                        dashboardStyles.Item
                      )}
                    >
                      {item.icon && (
                        <div className="pr-1">
                          <Icon source={Icons[item.icon]} color="base" />
                        </div>
                      )}
                      <Text>{item.title}</Text>
                    </div>
                  </Link>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
