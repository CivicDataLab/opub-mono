import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs"
    },
    {
      title: "Support",
      href: "/support",
      disabled: true
    }
  ],
  sidebarNav: [
    {
      title: "Dataset Management",
      href: "/dashboard",
      icon: "dataset"
    },
    {
      title: "Account Management",
      href: "/dashboard/account",
      icon: "settings"
    }
  ]
};
