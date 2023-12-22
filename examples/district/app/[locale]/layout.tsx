import { MobileNav } from '@/components/mobile-nav';
import { Footer } from './components/footer';
import locales from '../../config/locales';
import Provider from '@/components/provider';
import { siteConfig } from '@/config/site';
import { NextIntlClientProvider } from 'next-intl';
import { Inter as FontSans } from 'next/font/google';
import { notFound } from 'next/navigation';
import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

const fontSans = FontSans({ subsets: ['latin'], display: 'swap' });

export function generateStaticParams() {
  return locales.all.map((locale) => ({ locale }));
}

export async function generateMetadata() {
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
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={fontSans.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>
            <MobileNav />
            {children}
            <Footer />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
