import type { AppProps } from 'next/app';

import ThemeProvider from '@components/theme';
import Navbar from '@components/navbar';
import Footer from '@components/footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
