import { Icons } from '@/components/icons';

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
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



export type FilterProps = {
  [key: string]: string[];
};

export type Datasets = {
  title: string;
  slug: string | null | undefined;
  source: string;
  description: string;
  organization: {
    logo? : string | undefined | undefined,
    homepage: string
  },
  metaData: {
    lastUpdated: string;
    updateFrequency: string;
    period: string[];
    fileTypes: (string | 'NA')[];
    tags: (string | 'NA')[];
    licenses: (string | 'NA')[];
  };
  resources?: {
    fileName: string;
    size: string;
    updated: string;
  }[];
};
