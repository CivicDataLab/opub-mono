import React from 'react';
import { notFound } from 'next/navigation';

import { DashboardLayout } from './components/dashboard-layout';
import { MainNav } from './components/main-nav';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function Layout({ children }: DashboardLayoutProps) {
  const user = true; // await getCurrentUser()

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col grow h-full">
      <header className="py-3 px-4 shadow-deep bg-surfaceDefault z-2 relative">
        <MainNav />
      </header>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
