import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconDots } from '@tabler/icons-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Icon,
  IconButton,
  Menu,
  Text,
} from 'opub-ui';
import { useWindowSize } from 'usehooks-ts';

import Icons from '@/components/icons';

const ITEMS_TO_DISPLAY = 2;

export function BreadCrumb({
  crumbs,
  backUrl,
}: {
  crumbs: {
    label: any;
    href?: string;
  }[];
  backUrl: string;
}) {
  const [open, setOpen] = React.useState(false);
  const { width } = useWindowSize();
  const isDesktop = width && width > 768;
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 bg-backgroundSolidDefault px-2 py-3 md:container md:gap-4 md:bg-transparent md:pt-5">
      <Link href={backUrl} className="hidden md:block">
        <Text visuallyHidden>Go to State Page</Text>
        <Icon source={Icons.leftFilled} size={24} className="mb-[-1px]" />
      </Link>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={crumbs[0].href}>
              {crumbs[0].label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {crumbs.length > ITEMS_TO_DISPLAY ? (
            <>
              <BreadcrumbItem>
                {isDesktop ? (
                  <Menu
                    align="start"
                    closeOnSelect
                    trigger={
                      <IconButton size="slim" icon={IconDots}>
                        Toggle menu
                      </IconButton>
                    }
                    items={crumbs.slice(1, -1).map((item) => ({
                      content: item.label,
                      onAction: () => router.push(item.href || '#'),
                    }))}
                  />
                ) : (
                  <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger aria-label="Toggle Menu" asChild>
                      <IconButton size="slim" icon={IconDots}>
                        Toggle menu
                      </IconButton>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader className="text-left">
                        <DrawerTitle>Navigate to</DrawerTitle>
                        <DrawerDescription>
                          Select a page to navigate to.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="grid gap-1 px-4">
                        {crumbs.slice(1, -1).map((item, index) => (
                          <Link
                            key={index}
                            href={item.href ? item.href : '#'}
                            className="text-sm py-1"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <DrawerFooter className="pt-4">
                        <DrawerClose asChild>
                          <Button kind="secondary" variant="interactive">
                            Close
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : null}

          {crumbs.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
            <BreadcrumbItem key={index}>
              {item.href ? (
                <>
                  <BreadcrumbLink
                    asChild
                    className="max-w-64 truncate md:max-w-none"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbPage className="max-w-64 truncate md:max-w-none">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
