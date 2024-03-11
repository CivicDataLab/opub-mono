'use client';

import { signIn, useSession } from 'next-auth/react';

import { Loading } from '@/components/loading';
import { InProgress } from './components/in-progress';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    signIn('keycloak');
  }

  if (session) {
    return (
      <div className="h-full min-h-full">
        <InProgress />
      </div>
    );
  }
}
