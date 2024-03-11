'use client';

import React from 'react';
import { signIn, useSession } from 'next-auth/react';

import { Loading } from '@/components/loading';
import { DashboardLayout } from './components/dashboard-layout';
import { MainNav } from './components/main-nav';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    signIn('keycloak');
  }

  if (session)
    return (
      <div className="flex h-full grow flex-col">
        <header className="relative z-2 bg-surfaceDefault px-4 py-3 shadow-elementTopNav">
          <MainNav />
        </header>
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    );
}
