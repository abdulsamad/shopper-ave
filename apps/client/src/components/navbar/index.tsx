import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import MobileNav from './MobileNav';

const Index = () => {
  const [opened, setOpened] = useState(false);

  return (
    <motion.nav className="" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Hello World!</h1>
    </motion.nav>
  );
};

export default Index;
