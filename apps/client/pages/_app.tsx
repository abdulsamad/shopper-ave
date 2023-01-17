import { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Navbar from '@components/user/navbar';
import Footer from '@components/user/footer';

// Global Styles
import '@styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default MyApp;
