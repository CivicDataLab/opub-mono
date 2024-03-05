import React from 'react';

import { EditLayout } from './components/EditLayout';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  params: { id: string };
}

export default async function Layout({
  children,
  params,
}: DashboardLayoutProps) {
  return <EditLayout params={params}>{children}</EditLayout>;
}
