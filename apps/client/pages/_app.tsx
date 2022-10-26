import type { AppProps } from 'next/app';

// Global CSS
import '@styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
