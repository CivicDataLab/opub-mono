import { AnalyticsDashboardLayout } from './components/analytics-dashboard-layout';

export default async function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnalyticsDashboardLayout>{children}</AnalyticsDashboardLayout>
  );
}
