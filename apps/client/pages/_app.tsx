import type { AppProps } from 'next/app';

import Navbar from '@components/navbar';
import Footer from '@components/footer';

// Global Styles
import '@styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default MyApp;
