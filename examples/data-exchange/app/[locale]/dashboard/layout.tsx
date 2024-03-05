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
    <div className="flex h-full grow flex-col">
      <header className="relative z-2 bg-surfaceDefault px-4 py-3 shadow-elementTopNav">
        <MainNav />
      </header>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
