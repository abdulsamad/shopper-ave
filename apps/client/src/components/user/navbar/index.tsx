import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShoppingCartIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

import { useIsAuthenticated, useUser } from '@store/index';

import HamburgerIcon from './HamburgerIcon';
import { navLinks } from './navLinks';
import { DropdownItemVariant, dropdownVariants } from './framer-variants';
import { LinkButton } from '@utils/Button';

const Index = () => {
  const [opened, setOpened] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();

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
        {/* // TODO: Fix user greeting */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-1">
            <p className="mr-5">Hi, {user && 'name' in user && user.name}</p>
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
            <LinkButton className="bg-gray-200 text-gray-900" href="/login">
              <ArrowRightOnRectangleIcon className="mr-1.5 h-5 w-5" /> Log In
            </LinkButton>
            <LinkButton className="bg-primary text-white" href="/register">
              <UserPlusIcon className="mr-1.5 h-5 w-5" />
              Register
            </LinkButton>
          </div>
        )}
      </motion.nav>
    </header>
  );
};

export default Index;
