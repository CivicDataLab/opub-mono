import { SiteConfig } from 'types';

export const siteConfig: SiteConfig = {
  name: 'OPub',
  description:
    'An open source platform to speed up the development of Open Data Dashboards.',
  url: 'https://opub-www.vercel.app',
};

export const locales = ['en', 'hi'];

export const gqlConfig = {
  url: 'http://13.233.164.47/graphql',
  headers: {
    organization: '1',
  },
};
