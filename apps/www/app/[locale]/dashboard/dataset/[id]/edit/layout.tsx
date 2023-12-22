import { EditLayout } from './components/EditLayout';
import React from 'react';

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
