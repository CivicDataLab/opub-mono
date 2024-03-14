'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Icon, Spinner, Text } from 'opub-ui';

import { Icons } from '@/components/icons';

const SignIn = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      void signIn('keycloak');
    } else if (status === 'authenticated') {
      const callbackUrl = window.location.search.includes('callbackUrl=')
        ? decodeURIComponent(
            window.location.search.replace(/^\?callbackUrl=/, '')
          )
        : '/';
      void router.push(callbackUrl);
      void router.refresh();
    }
  }, [status, router]);

  return <LogginInPage />;
};

export default SignIn;

const LogginInPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-surfaceDefault">
      <Link href="/">
        <div className="flex items-center gap-2 pl-4 pt-[18px]">
          <Icon source={Icons.logo} size={24} color="success" />
          <Text variant="headingLg" as="h1">
            OPub
          </Text>
        </div>
      </Link>
      <div className="flex h-full w-full flex-col items-center justify-center gap-1">
        <Spinner />
        <Text variant="headingLg">Logging In</Text>
      </div>
    </div>
  );
};
