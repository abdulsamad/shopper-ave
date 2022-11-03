import React, { useState } from 'react';
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery';

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Index = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, setOpened] = useState(false);

  const toggleMenu = () => {
    setOpened((open) => !open);
  };

  if (isMobile) {
    return <MobileNav opened={opened} toggleMenu={toggleMenu} />;
  }

  return <DesktopNav />;
};

export default Index;
