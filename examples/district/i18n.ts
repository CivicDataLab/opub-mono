import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import locales from './config/locales';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.all.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
