'use client';
import { Text, IconButton, Icon } from 'opub-ui';
import Icons from './icons';
import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { mainConfig } from '@/config/site';
import { usePathname } from 'next/navigation';

const districts = [
  {
    title: 'Morigaon',
    href: 'morigaon',
  },
  {
    title: 'Nagaon',
    href: 'nagaon',
  },
];

export const MobileNav = () => {
  const [open, setOpen] = React.useState(false);

  const path = usePathname();

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }

    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [open]);

  return (
    <>
      <header>
        <div className="md:hidden px-5 py-3 bg-backgroundSolidDark text-textOnBGDefault flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <g
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                clipPath="url(#a)"
              >
                <path d="M8 4 4 6v5l4 2 4-2V6L8 4ZM12 11l4 2 4-2V6l-4-2-4 2M8 13v5l4 2 4-2v-5" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
            </svg>
            <Text variant="headingSmSpaced" color="inherit">
              D4D ASSAM
            </Text>
          </Link>

          <IconButton
            icon={open ? Icons.cross : Icons.menu}
            onClick={() => setOpen((e) => !e)}
            color="onBgDefault"
          >
            Menu
          </IconButton>
        </div>
      </header>
      {open && (
        <div className="h-screen overflow-y-auto bg-backgroundSolidDark text-textOnBGDefault border-t-1 border-solid border-baseGraySlateSolid11">
          <Link
            href="/"
            className={cn(
              'py-2 pl-1 flex items-center gap-2',
              path === '/' && 'bg-baseIndigoAlpha12'
            )}
            onClick={() => setOpen(false)}
          >
            <span
              className={cn(
                'rounded-r-1 w-1 h-11',
                path === '/' && 'bg-baseVioletSolid11'
              )}
            />
            <div className="p-3 pr-5 flex items-center gap-3 ">
              <Icon source={Icons.home} color="onBgDefault" />
              <Text variant="headingSmSpaced" color="inherit">
                Home (District List)
              </Text>
            </div>
          </Link>

          {districts.map((district) => (
            <NavItem
              key={district.title}
              district={district}
              setNavState={setOpen}
              path={path}
            />
          ))}
        </div>
      )}
    </>
  );
};

const NavItem = ({
  district,
  setNavState,
  path,
}: {
  district: {
    title: string;
    href: string;
  };
  setNavState: React.Dispatch<React.SetStateAction<boolean>>;
  path: string;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <button
          className={cn(
            'py-2 pl-1 flex items-center gap-2 text-textOnBGDefault bg-transparent border-none w-full',
            open && 'bg-baseIndigoAlpha12'
          )}
        >
          <span
            className={cn(
              'rounded-r-1 w-1 h-11',
              open && 'bg-baseVioletSolid11'
            )}
          />
          <div className="flex items-center justify-between gap-3 w-full p-3 pr-5">
            <div className="flex items-center gap-3 ">
              <Icon source={Icons.diamond} color="onBgDefault" />
              <Text variant="headingSmSpaced" color="inherit">
                {district.title}
              </Text>
            </div>
            <Icon
              source={Icons.doubleRight}
              color="onBgDefault"
              className={cn('transform', open && ' rotate-90')}
            />
          </div>
        </button>
      </Collapsible.Trigger>

      <Collapsible.Content>
        <div
          className={cn(
            'flex flex-col gap-2 pt-2 pb-4 pl-5',
            open && 'bg-baseIndigoAlpha12'
          )}
        >
          {mainConfig.sidebarNav.map((item) => {
            const link = `/${district.href}${item.href}`;

            return (
              <Link
                key={item.title}
                href={link}
                className={cn(
                  'py-3 px-5 rounded-1 text-textOnBGDefault w-full',
                  path === link && 'bg-backgroundSolidDefault text-textDefault'
                )}
                onClick={() => setNavState(false)}
              >
                <Text variant="headingSm" color="inherit">
                  {item.title}
                </Text>
              </Link>
            );
          })}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
