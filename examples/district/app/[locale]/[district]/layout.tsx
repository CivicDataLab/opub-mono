import { DashboardLayout } from './components/dashboard-layout';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { mainConfig } from '@/config/site';

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden md:block">
        <MainNav data={mainConfig} />
      </div>

      <DashboardLayout dashboardConfig={mainConfig}>{children}</DashboardLayout>
    </>
  );
}
