import { AnalyticsDashboardLayout } from './components/analytics-dashboard-layout'
import React from 'react'

export default async function AnalyticsLayout({ children }: { children: React.ReactNode }) {
	return <AnalyticsDashboardLayout>{children}</AnalyticsDashboardLayout>
}
