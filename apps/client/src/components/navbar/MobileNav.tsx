import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, Variants } from 'framer-motion';

import { navLinks } from './navLinks';

interface IMobileNav {
  opened: boolean;
  toggleMenu: () => void;
}

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.1,
    },
  },
};

const DropdownItemVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const MobileNav = ({ opened, toggleMenu }: IMobileNav) => {
  return (
    <motion.nav
      className="flex items-center px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <div className="overflow-hidden">
        <button className="h-100 w-100 mr-2 p-1" onClick={toggleMenu}>
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
              animate={{ opacity: opened ? 0 : 1, scaleX: opened ? 0 : 1 }}
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
      <h1 className="text-2xl font-bold">ShopperAve</h1>
      <AnimatePresence>
        {opened && (
          <motion.ul
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={dropdownVariants}
            className="absolute top-[60px] left-1/2 flex w-full -translate-x-1/2 flex-col items-center space-y-2 bg-white py-2 shadow-md">
            {navLinks.map(({ path, text }) => (
              <motion.li key={path} className="w-full text-center" variants={DropdownItemVariant}>
                <Link href={path}>{text}</Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default MobileNav;
