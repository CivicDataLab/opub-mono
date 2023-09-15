import { Inter as FontSans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, createTranslator } from 'next-intl';

import { mainConfig, siteConfig } from '@/config/site';
import { MainNav } from '@/components/main-nav';
import Provider from '@/components/provider';
import locales from '../../config/locales';

const fontSans = FontSans({ subsets: ['latin'], display: 'swap' });

export function generateStaticParams() {
  return locales.all.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = (await import(`../../locales/${locale}.json`)).default;

  const t = createTranslator({ locale, messages });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      'Next.js',
      'React',
      'Server Components',
      'Radix UI',
      'OPub',
      'Open Publishing',
    ],
    authors: [
      {
        name: 'CivicDataLab',
        url: 'https://civicdatalab.in/',
      },
    ],
    creator: 'CivicDataLab',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [`${siteConfig.url}/og.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [`${siteConfig.url}/og.png`],
      creator: 'CivicDataLab',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: `${siteConfig.url}/apple-touch-icon.png`,
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={fontSans.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>
            <MainNav data={mainConfig} />
            {children}
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
