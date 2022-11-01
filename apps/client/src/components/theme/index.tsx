import React from 'react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ThemeProvider;
