import { useRouter } from 'next/router';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span>OPub Documentation</span>,
  project: {
    link: 'https://github.com/civicdatalab/opub-mono',
  },
  docsRepositoryBase:
    'https://github.com/CivicDataLab/opub-mono/tree/main/apps/docs',

  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – OPub',
      };
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="OPub" />
      <meta property="og:description" content="The next site builder" />
    </>
  ),
  sidebar: {
    toggleButton: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
};

export default config;
