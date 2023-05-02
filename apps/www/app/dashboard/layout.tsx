import { notFound } from 'next/navigation';

import { dashboardConfig } from '@/config/dashboard';
import { DashboardNav } from './components/dashboard-nav';
import { MainNav } from './components/main-nav';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = true; // await getCurrentUser()

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <header className="py-3 px-4 shadow-deep bg-surfaceDefault z-2 relative">
        <MainNav />
      </header>
      <div className="grid gap-6 grid-cols-[240px_1fr] grow">
        <aside className="pt-6 pr-2 bg-surfaceDefault z-1 shadow-inset">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="pr-6">{children}</main>
      </div>
    </div>
  );
}
