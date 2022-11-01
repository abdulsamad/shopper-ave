import type { AppProps } from 'next/app';

import Navbar from '@components/navbar';

// Global Styles
import '@styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <h1 className="text-center">Hello World!</h1>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
