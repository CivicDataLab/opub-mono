'use client';

import dashboardStyles from './Content.module.scss';
import { isActive } from './dashboard-sidebar';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { SidebarNavItem } from '@/types';
import { IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
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
import React from 'react';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export function MobileDashboardNav({ items }: DashboardNavProps) {
  const [open, setOpen] = React.useState(false);

  const path = usePathname();
  const { district, department } = useParams();

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
        <div className="w-[96vw]">
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
              <MenuLink
                href={`/${district}`}
                title={district}
                department={department}
                district={district}
                setOpen={setOpen}
              />
              {items.map((item) => {
                return (
                  <MenuLink
                    key={item.href + path}
                    href={`/${district}${item.href}`}
                    title={item.title}
                    department={department}
                    setOpen={setOpen}
                  />
                );
              })}
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </div>
  );
}

const MenuLink = ({
  href,
  title,
  icon,
  department,
  district,
  setOpen,
}: {
  href: string;
  title: string | string[];
  icon?: string;
  department: string | string[];
  district?: string | string[];
  setOpen: (e: boolean) => void;
}) => {
  return (
    <CommandItem
      key={href + title}
      className={cn('flex justify-between relative p-0')}
    >
      <Link
        href={href || '#'}
        onClick={() => setOpen(false)}
        className={cn(
          'py-3 px-2 w-full',
          isActive(department, href, district) && dashboardStyles.Selected
        )}
      >
        <span
          className={cn(
            'bg-transparent rounded-r-2 w-[6px] h-full absolute top-0 left-[-10px]',
            isActive(department, href, district) && 'bg-decorativeIconFour'
          )}
        />
        <div
          className={cn(
            'flex items-center w-full rounded-1 overflow-hidden',
            dashboardStyles.Item
          )}
        >
          {icon && (
            <div className="pr-1">
              <Icon source={Icons[icon]} color="default" />
            </div>
          )}
          <Text className="capitalize">{title}</Text>
        </div>
      </Link>
    </CommandItem>
  );
};
