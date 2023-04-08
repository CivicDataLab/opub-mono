import type { AppProps } from 'next/app';
import '@opub-cdl/ui/dist/assets/styles.css';
import React from 'react';
import { SSRProvider } from 'react-aria';

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const theme = localStorage.getItem('opub-theme');
    if (theme) {
      document.querySelector('html')?.setAttribute('data-theme', theme);
    }
  }, []);

  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
