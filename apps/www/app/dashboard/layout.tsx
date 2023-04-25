"use client";

import { notFound } from "next/navigation";

import { dashboardConfig } from "@/config/dashboard";
import { DashboardNav } from "./components/dashboard-nav";
import { MainNav } from "./components/main-nav";
import styles from "./dashboard.module.scss";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = true; // await getCurrentUser()

  if (!user) {
    return notFound();
  }

  return (
    <div className={styles.Container}>
      <header className={styles.Header}>
        <MainNav />
      </header>
      <div className={styles.Wrapper}>
        <aside className={styles.Aside}>
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
