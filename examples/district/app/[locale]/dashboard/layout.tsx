import { DashboardLayout } from './components/dashboard-layout';
import { DashboardNav } from './components/dashboard-nav';
import { dashboardConfig } from '@/config/dashboard';
import { notFound } from 'next/navigation';
import React from 'react';

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
      <header className="py-3 px-4 bg-surface z-2 relative shadow-deep">
        <DashboardNav />
      </header>
      <DashboardLayout dashboardConfig={dashboardConfig}>
        {children}
      </DashboardLayout>
    </div>
  );
}
