'use client';

import React from 'react';
import Link from 'next/link';
import { useMetaKeyPress } from '@/hooks/use-meta-key-press';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  Avatar,
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Divider,
  Icon,
  IconButton,
  Popover,
  SearchInput,
  Spinner,
  Text,
} from 'opub-ui';

import { Icons } from '@/components/icons';

const profileLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
];

export function MainNav() {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();
  const [commandOpen, setCommandOpen] = React.useState(false);

  useMetaKeyPress('k', () => setCommandOpen((e) => !e));

  async function keycloakSessionLogOut() {
    try {
      setIsLoggingOut(true);
      await fetch(`/api/auth/logout`, { method: 'GET' });
    } catch (err) {
      setIsLoggingOut(false);
      console.error(err);
    }
  }

  if (isLoggingOut) {
    return <LogginOutPage />;
  }

  return (
    <nav>
      <div className="flex items-center justify-between gap-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Icon source={Icons.logo} size={24} color="success" />
            <Text variant="headingLg" as="h1">
              OPub
            </Text>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <SearchInput
            placeholder="Search"
            name="Search"
            className="hidden w-full max-w-[350px] md:block"
            label="Search"
            ref={searchRef}
            suffix={
              <div className="relative">
                <Divider
                  orientation="vertical"
                  className="absolute left-[-4px] top-[3px] h-6"
                />
                <IconButton
                  size="slim"
                  icon={Icons.terminal}
                  withTooltip
                  onClick={() => setCommandOpen(true)}
                >
                  Command palette
                </IconButton>

                <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                  <CommandInput placeholder="search..." />
                  <CommandList>
                    <CommandEmpty>No results found</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>Create Dataset</CommandItem>
                      <CommandItem>Create new Organisation</CommandItem>
                      <CommandItem>Go to profile</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </CommandDialog>
              </div>
            }
          />
          {status === 'loading' ? (
            <div className="min-w-[112px]" />
          ) : (
            <div className="flex min-w-[112px] shrink-0 items-center justify-end gap-4">
              <Icon source={Icons.notification} />
              {session?.user ? (
                <ProfileContent
                  session={session}
                  keycloakSessionLogOut={keycloakSessionLogOut}
                />
              ) : (
                <Button
                  onClick={() => {
                    signIn('keycloak');
                  }}
                  kind="secondary"
                >
                  Log In
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const ProfileContent = ({
  session,
  keycloakSessionLogOut,
}: {
  session: Session;
  keycloakSessionLogOut: () => Promise<void>;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        {session.user.image ? (
          <IconButton icon={session.user.image} size="slim">
            {session.user.name}
          </IconButton>
        ) : (
          <Button
            kind="tertiary"
            size="slim"
            className="rounded-full hover:no-underline"
          >
            <Avatar
              showInitials
              name={session.user.name || 'User'}
              size="small"
            />
          </Button>
        )}
      </Popover.Trigger>
      <Popover.Content align="end">
        <div className="rounded-3 py-2 shadow-basicDeep">
          <div className="flex flex-col px-5 py-2">
            <Text variant="bodyMd" fontWeight="medium">
              {session.user.name}
            </Text>
            <Text variant="bodyMd">{session.user.email}</Text>
          </div>
          <div className="flex w-full flex-col">
            {profileLinks.map((link) => (
              <Text variant="bodyMd" key={link.href}>
                <Link
                  onClick={() => setOpen(false)}
                  href={link.href}
                  className="block w-full px-5 py-2 text-textSubdued transition-colors duration-100 ease-ease hover:bg-actionSecondaryNeutralHovered hover:text-textDefault"
                >
                  {link.label}
                </Link>
              </Text>
            ))}
          </div>
          <Divider className="mx-3 my-3 w-auto" />
          <div className="px-3">
            <Button
              onClick={() => {
                setOpen(false);
                keycloakSessionLogOut().then(() =>
                  signOut({ callbackUrl: '/' })
                );
              }}
              kind="secondary"
              size="slim"
              fullWidth
            >
              Log Out
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
};

const LogginOutPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Link href="/">
        <div className="flex items-center gap-2 pt-[6px]">
          <Icon source={Icons.logo} size={24} color="success" />
          <Text variant="headingLg" as="h1">
            OPub
          </Text>
        </div>
      </Link>
      <div className="flex h-full w-full flex-col items-center justify-center gap-1">
        <Spinner />
        <Text variant="headingLg">Logging out</Text>
      </div>
    </div>
  );
};
