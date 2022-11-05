import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import { navLinks } from './navLinks';
import { DropdownItemVariant, dropdownVariants } from './framer-variants';

const Index = () => {
  const [opened, setOpened] = useState(false);

  const toggleMenu = useCallback(() => {
    setOpened((open) => !open);
  }, []);

  return (
    <header>
      <motion.nav
        className="flex items-center justify-between px-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <div className="flex">
          <button className="h-100 w-100 mr-2 p-1 md:hidden" onClick={toggleMenu}>
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
          <h1 className="text-2xl font-bold">ShopperAve</h1>
        </div>
        {/* Mobile Dropdown Menu*/}
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
        {/* Desktop Menu*/}
        <div className="hidden space-x-6 md:flex">
          {navLinks.map(({ text, path }) => (
            <Link key={path} href={path}>
              {text}
            </Link>
          ))}
        </div>
        <div className="space-x-1">
          <button className="p-1">
            <ShoppingCartIcon className="h-6 w-6" />
            <div className="sr-only">Cart</div>
          </button>
          <button className="p-1">
            <UserCircleIcon className="h-6 w-6" />
            <div className="sr-only">User Profile</div>
          </button>
        </div>
      </motion.nav>
    </header>
  );
};

export default Index;
