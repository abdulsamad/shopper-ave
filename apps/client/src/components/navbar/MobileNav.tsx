import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface IMobileNav {
  opened: boolean;
  toggleMenu: () => void;
}

const MobileNav = ({ opened, toggleMenu }: IMobileNav) => {
  return (
    <motion.nav
      className="flex items-center justify-between px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold">ShopperAve (Mobile)</h1>
      <div className="hidden space-x-6">
        <Link href="/">Home</Link>
        <Link href="/">Collections</Link>
      </div>
      <div className="space-x-1">
        <button className="p-1">
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
    </motion.nav>
  );
};

export default MobileNav;
