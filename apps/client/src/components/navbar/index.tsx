import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Index = () => {
  const [opened, setOpened] = useState(false);

  return (
    <motion.nav
      className="flex items-center justify-between px-12 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold">ShopperAve</h1>
      <div className="flex space-x-6">
        <Link href="/">Home</Link>
        <Link href="/">Collections</Link>
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
  );
};

export default Index;
