import { MainConfig, SiteConfig } from 'types';

export const siteConfig: SiteConfig = {
  name: 'OPub',
  description:
    'An open source platform to speed up the development of Open Data Dashboards.',
  url: 'https://opub-www.vercel.app',
};

export const ckan = {
  homepage:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/1a367191-4c7f-469c-970e-98792988c183/download/dist_data.json',
  department:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/90720dad-7c29-41a4-8780-11121ef31213/download/dept.json',
  overview:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/98bc0fed-3e74-40bd-b6fd-07d1fc4d9494/download/schm_narrative.json',
  indicators:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/6a28cb75-b400-4f52-adb1-0f219338ed03/download/indicators_data.json',
  chart:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/d81d295b-51a8-44f7-b150-77a114b14d57/download/scheme_explorer_data.json',
  table:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/55fa07ae-7147-445e-8eb6-7a76c4f7f2cb/download/scheme_explorer_table_data.json',
  rawTable:
    'https://ckan.civicdatalab.in/dataset/20c5eb7a-b46a-4c35-b381-dfb5dfa2cb71/resource/44c8e98d-7fee-4a0d-909d-4a8999ea017f/download/scheme_explorer_table_data_without_format.json',
};

export const mapPosition: {
  [key: string]: [string, string];
} = {
  morigaon: ['80%', '80%'],
};

export const locales = ['en', 'hi'];

export const gqlConfig = {
  url: 'https://opub-backend.civicdatalab.in/graphql',
  headers: {
    Authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJMRjA0YXlXYVBPRE9lYlRDOVZhUUR1ZlE4LW5oZEVDMEhaeU5YN2dsWnBrIn0.eyJleHAiOjE2OTQ5NTA3ODQsImlhdCI6MTY5NDUxODc4NSwiYXV0aF90aW1lIjoxNjk0NTE4Nzg0LCJqdGkiOiI5MjgzNTE2ZC01YWM1LTRkOTItYWNjOC00NTNiOGI3ZDRkZGEiLCJpc3MiOiJodHRwczovL29wdWIta2MuY2l2aWNkYXRhbGFiLmluL2F1dGgvcmVhbG1zL2V4dGVybmFsIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjI3ZDA4N2E2LTA5NDctNDc1NS05ZjJiLTE3NzFlM2QyYTMzZCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wdWItaWRwIiwic2Vzc2lvbl9zdGF0ZSI6IjM5MTQyNGU3LWY1YWYtNDRlNi05MDg2LTIyM2FmZTgwMWFlYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWV4dGVybmFsIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiMzkxNDI0ZTctZjVhZi00NGU2LTkwODYtMjIzYWZlODAxYWViIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJhYmhpbmF2IEtVTUFSIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWJoaW5hdkBjaXZpY2RhdGFsYWIuaW4iLCJnaXZlbl9uYW1lIjoiYWJoaW5hdiIsImZhbWlseV9uYW1lIjoiS1VNQVIiLCJlbWFpbCI6ImFiaGluYXZAY2l2aWNkYXRhbGFiLmluIn0.vwv1k3ElxkV20mNkyEKkGH3rtc8XgTt678TBVO_XffbPU5kbwhAw0bTvqPOeP_5XqwuqYVx9d4SxeKDmSMKPirgDhNxqexL1BfS47akytGpzbOcbumkZ0XgZ6xkGpAXxk_B5h486p6E7dgbTVhU9KdTppYoHXjzfMHcRuOOGy1IvTd8ZpCaRcqOun7WOxkPIDn7RXlnHfbY5snJTavoxo0u02Bk8L7O0ozO1ahx-JvJ6wXjVrPjdTKONZ2g3Jetc3xAk5Eirxzp4TfTaGTwzyhXYuiLXuWC0-qla7h8elIaio5frBY4RcalNW7s1mF9RHjoC3uFcj6ThYrt7SY3ldg',
  },
};


export const elasticSearch = {
  datasets: 'https://opub-backend.civicdatalab.in/facets/'
}

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
  mainNav: [
    {
      title: 'Analytics',
      href: '/analytics',
    },
    {
      title: 'Datasets',
      href: '/datasets',
    },
  ],

  sidebarNav: [
    {
      title: 'Panchayat & Rural Development',
      href: '/panchayat-and-rural-development',
    },
    {
      title: 'Public Health Engineering',
      href: '/public-health-engineering',
    },
  ],
};
