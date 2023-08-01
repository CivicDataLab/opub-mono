import { MainConfig, SiteConfig } from 'types';

export const siteConfig: SiteConfig = {
  name: 'OPub',
  description:
    'An open source platform to speed up the development of Open Data Dashboards.',
  url: 'https://opub-www.vercel.app',
};

export const ckan = {
  homepage:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/1a367191-4c7f-469c-970e-98792988c183/download/dist.json',
  department:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/90720dad-7c29-41a4-8780-11121ef31213/download/dept.json',
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
      icon: 'department',
    },
    {
      label: 'Explore Schemes',
      href: '/#',
      icon: 'scheme',
    },
  ],
};

export const mainConfig: MainConfig = {
  homeUrl: '/',
  mainNav: [],

  sidebarNav: [
    {
      title: 'District Home',
      href: '/',
      icon: 'home',
    },
    {
      title: 'Panchayat & Rural Development',
      href: '/panchayat-and-rural-development',
    },
    {
      title: 'Public Health Engineering',
      href: '/public-health-engineering',
    },
    {
      title: 'Health Department',
      href: '/health-department',
    },
    {
      title:
        'PWRD, Bongaigaon District Territorial Road Division, and few more words to show long department names',
      href: '/pwrd-bongaigaon-district-territorial-road-division',
    },
  ],
};
