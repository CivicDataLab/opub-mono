'use client';

import React from 'react';

import { DashboardLayout } from './components/dashboard-layout';
import { MainNav } from './components/main-nav';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-full grow flex-col">
      <header className="relative z-2 bg-surfaceDefault px-4 py-3 shadow-elementTopNav">
        <MainNav />
      </header>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
