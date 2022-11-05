import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      <h1 className="text-2xl font-bold">ShopperAve</h1>
      <div className="bg-primary absolute top-[60px] left-1/2 flex w-full -translate-x-1/2 flex-col space-x-6 p-5">
        <Link href="/">Home</Link>
        <Link href="/">Collections</Link>
      </div>
      <div className="overflow-hidden">
        <button className="h-100 w-100 p-3" onClick={toggleMenu}>
          <div className="space-y-[5px]">
            <motion.div
              animate={{
                rotateZ: opened ? '45deg' : '0deg',
                translateY: opened ? 6.5 : 0,
                transition: { delay: 0.1 },
              }}
              className="h-[1.5px] w-5 rounded-full bg-black"
            />
            <motion.div
              animate={{ opacity: opened ? 0 : 1 }}
              className="h-[1.5px] w-5 rounded-full bg-black"
            />
            <motion.div
              animate={{
                rotateZ: opened ? '-45deg' : '0deg',
                translateY: opened ? -6.5 : 0,
                transition: { delay: 0.25 },
              }}
              className="h-[1.5px] w-5 rounded-full bg-black"
            />
          </div>
        </button>
      </div>
    </motion.nav>
  );
};

export default MobileNav;
