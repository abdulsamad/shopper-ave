import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShoppingCartIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

import { useCart, useIsAuthenticated, useUser, useAuthActions } from '@store/index';

import HamburgerIcon from './HamburgerIcon';
import { navLinks } from './navLinks';
import { DropdownItemVariant, dropdownVariants } from './framer-variants';
import { LinkButton } from '@utils/Button';
import Dropdown, { DropdownLink, DropdownButton } from '@utils/Dropdown';
import { generateAvatar } from '@utils/index';

const Index = () => {
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const { logout } = useAuthActions();
  const { items } = useCart();
  const [opened, setOpened] = useState(false);

  const router = useRouter();
  const isCartFilled = items.length > 0;

  const toggleMenu = useCallback(() => {
    setOpened((open) => !open);
  }, []);

  const avatar = useMemo(() => {
    if (!user) return '';

    return generateAvatar(user.name, 35);
  }, [user]);

  return (
    <header className="container mx-auto">
      <motion.nav
        className="flex items-center justify-between px-1 py-2 lg:px-3"
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
              className="absolute top-[50px] left-1/2 z-50 flex w-full -translate-x-1/2 flex-col items-center space-y-2 bg-white py-2 shadow-md">
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
        {isAuthenticated && user ? (
          <div className="flex items-center space-x-2">
            {!router.pathname.includes('/admin') && (
              <LinkButton href="/admin" className="bg-primary mr-2 h-8 text-white">
                Admin
              </LinkButton>
            )}
            <Dropdown
              title={user.name}
              className="text-center"
              icon={
                <Image
                  src={user.photo ? user.photo.secure_url : avatar}
                  alt={user.name}
                  className="rounded-full"
                  aria-hidden={true}
                  width={25}
                  height={25}
                />
              }>
              <DropdownLink href="/profile">Profile</DropdownLink>
              <DropdownLink href="/orders">Orders</DropdownLink>
              <DropdownButton onClick={logout} divider>
                <div className="flex items-center">
                  <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5" />
                  Logout
                </div>
              </DropdownButton>
            </Dropdown>
            <LinkButton href="/cart" className="relative px-[5px]">
              <ShoppingCartIcon className="h-6 w-6" />
              <div className="sr-only">Cart</div>
              {isCartFilled && (
                <span className="bg-primary absolute bottom-[2px] right-0 flex h-4 w-4 items-center justify-center rounded-lg text-xs text-white">
                  {items.length}
                </span>
              )}
            </LinkButton>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <LinkButton className="inline-flex bg-gray-200 text-gray-900" href="/login">
              <ArrowRightOnRectangleIcon className="mr-1.5 h-5 w-5" /> Log In
            </LinkButton>
            <LinkButton className="bg-primary inline-flex text-white" href="/register">
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
