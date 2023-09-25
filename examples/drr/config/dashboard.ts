import { DashboardConfig, MainConfig } from 'types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Dataset Management',
      href: '/dashboard/dataset',
      icon: 'datasetSettings',
    },
    {
      title: 'Account Management',
      href: '/dashboard/account',
      icon: 'userSettings',
    },
  ],
};

export type DatasetProp = {
  id: string;
  name: string;
  description: string;
  owner: string;
  created: Date;
  modified: Date;
  size: number;
  status: string;
  tags: string[];
};

export const testDataset: { [key: string]: DatasetProp } = {
  '1': {
    id: '1',
    name: 'Test Dataset 1',
    description: 'This is a test dataset 1',
    owner: 'test',
    created: new Date(),
    modified: new Date(),
    size: 100,
    status: 'active',
    tags: ['test-1', 'dataset'],
  },
  '2': {
    id: '2',
    name: 'Test Dataset 2',
    description: 'This is a test dataset 2',
    owner: 'test',
    created: new Date(),
    modified: new Date(),
    size: 100,
    status: 'active',
    tags: ['test-2', 'dataset'],
  },
};
