import React from 'react';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersColorScheme = useColorScheme();

  return (
    <MantineProvider
      theme={{
        colorScheme: 'light' ?? prefersColorScheme,
        primaryColor: 'amber',
        colors: {
          amber: ['#FFC107'],
        },
        fontFamily: 'Inter, Open Sans, sans-serif',
        headings: {
          fontFamily: 'Merriweather, serif',
        },
      }}
      withGlobalStyles
      withNormalizeCSS>
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
