import { mainConfig } from '@/config/site';
import { DashboardLayout } from '../../dashboard/components/dashboard-layout';

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout dashboardConfig={mainConfig}>{children}</DashboardLayout>
  );
}
