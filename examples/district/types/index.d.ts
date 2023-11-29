import { Icons } from '@/components/icons';
import { IconSource } from '/types/icon';

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MainConfig = {} & (
  | {
      homeUrl: string;
      mainNav: MainNavItem[];
      sidebarNav: SidebarNavItem[];
    }
  | {
      homeUrl: string;
      mainNav: [];
      sidebarNav: SidebarNavItem[];
    }
);

export type MainNavItem = {
  title?: string;
  href?: string;
  disabled?: boolean;
  icon?: string;
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  href: string;
  icon?: keyof typeof Icons;
};

export type CreateDataset = {
  type: string;
  title: string;
  description: string;
  terms: boolean;
};

export type PatchDataset = {
  type: string;
  title: string;
  description: string;
  terms: boolean;
  id: string;
};

export type EditMetaDatasetProps = {
  source: string;
  created: string;
  frequency: string;
  tags: string[];
};

export type EditDistributionProps = {
  title: string;
  description: string;
  file: File[] | undefined;
};
