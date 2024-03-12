'use client';

import React from 'react';
import Link from 'next/link';
import { useKeyDetect } from '@/hooks/use-key-detect';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  Avatar,
  Button,
  Divider,
  Icon,
  IconButton,
  Popover,
  Text,
  TextField,
} from 'opub-ui';

import { Icons } from '@/components/icons';

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: 'GET' });
  } catch (err) {
    console.error(err);
  }
}

const profileLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
];

export function MainNav() {
  const { key, metaKey } = useKeyDetect();
  const searchRef = React.useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (key === 'k' && metaKey) {
      searchRef.current?.focus();
    }
  }, [key, metaKey]);

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

        <div className="hidden w-full max-w-[578px] md:block">
          <TextField
            prefix={<Icon source={Icons.search} />}
            placeholder="Search"
            name="Search"
            label="Search"
            labelHidden
            ref={searchRef}
          />
        </div>

        {status === 'loading' ? (
          <div className="min-w-[112px]" />
        ) : (
          <div className="flex min-w-[112px] shrink-0 items-center justify-end gap-4">
            <Icon source={Icons.notification} />
            {session?.user ? (
              <ProfileContent session={session} />
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
    </nav>
  );
}

const ProfileContent = ({ session }: { session: Session }) => {
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
