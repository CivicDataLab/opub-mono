import { Icons } from '@/components/icons';

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

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

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
