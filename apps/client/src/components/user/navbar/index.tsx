import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShoppingCartIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

import { useRootStore } from '@store/index';

import HamburgerIcon from './HamburgerIcon';
import { navLinks } from './navLinks';
import { DropdownItemVariant, dropdownVariants } from './framer-variants';

const Index = () => {
  const [opened, setOpened] = useState(false);
  const isAuthenticated = useRootStore((state) => state.isAuthenticated);

  const toggleMenu = useCallback(() => {
    setOpened((open) => !open);
  }, []);

  return (
    <header className="container mx-auto">
      <motion.nav
        className="flex items-center justify-between px-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <div className="flex">
          <button
            aria-label="Navigation Menu"
            className="h-100 w-100 mr-2 p-1 md:hidden"
            onClick={toggleMenu}>
            <HamburgerIcon opened={opened} />
          </button>
          <Link href="/">
            <h1 className="text-2xl font-bold">ShopperAve</h1>
          </Link>
        </div>
        {/* Mobile Dropdown Menu*/}
        <AnimatePresence>
          {opened && (
            <motion.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={dropdownVariants}
              className="absolute top-[60px] left-1/2 z-50 flex w-full -translate-x-1/2 flex-col items-center space-y-2 bg-white py-2 shadow-md">
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
        {isAuthenticated ? (
          <div className="flex items-center space-x-1">
            <button className="p-1">
              <ShoppingCartIcon className="h-6 w-6" />
              <div className="sr-only">Cart</div>
            </button>
            <button className="p-1">
              <UserCircleIcon className="h-6 w-6" />
              <div className="sr-only">User Profile</div>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              href="/login"
              className="inline-flex items-center rounded-lg bg-gray-200 py-1.5 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-300">
              <ArrowRightOnRectangleIcon className="mr-1.5 h-5 w-5" /> Log In
            </Link>
            <Link
              href="/register"
              className="bg-primary hover:bg-primary-500 hidden items-center rounded-lg py-1.5 px-3.5 text-sm font-semibold text-white lg:inline-flex">
              Register
            </Link>
          </div>
        )}
      </motion.nav>
    </header>
  );
};

export default Index;
