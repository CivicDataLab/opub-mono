import type { AppProps } from 'next/app';
import 'styles/theme.css';
import 'styles/breakpoints.scss';
import 'styles/base.css';
import React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const theme = localStorage.getItem('opub-theme');
    if (theme) {
      document.querySelector('html')?.setAttribute('data-theme', theme);
    }
  }, []);

  return <Component {...pageProps} />;
}
