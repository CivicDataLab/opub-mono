import { mainConfig } from '@/config/site';
import { DashboardLayout } from './components/dashboard-layout';
import { MainNav } from '@/components/main-nav';

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <MainNav data={mainConfig} />
     <DashboardLayout dashboardConfig={mainConfig}>{children}</DashboardLayout>
    </>
  );
}
