import { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Navbar from '@components/navbar';
import Footer from '@components/footer';

// Global Styles
import '@styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default MyApp;
