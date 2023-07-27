import { SiteConfig } from 'types';
import { Icons } from '@/components/icons';

export const siteConfig: SiteConfig = {
  name: 'OPub',
  description:
    'An open source platform to speed up the development of Open Data Dashboards.',
  url: 'https://opub-www.vercel.app',
};

export const locales = ['en', 'hi'];

export const gqlConfig = {
  url: 'https://opub-backend.civicdatalab.in/graphql',
  headers: {
    organization: '1',
  },
};

export const navbarConfig = {
  homeUrl: '/',
  links: [
    {
      label: 'Explore Departments',
      href: '/',
      icon: Icons.department,
    },
    {
      label: 'Explore Schemes',
      href: '/#',
      icon: Icons.scheme,
    },
  ],
};
