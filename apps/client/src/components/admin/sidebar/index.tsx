import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  ShoppingCartIcon,
  WrenchScrewdriverIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

const sidebarItems = [
  {
    title: 'Home',
    Icon: HomeIcon,
    route: '',
  },
  {
    title: 'Create Product',
    Icon: PlusCircleIcon,
    route: 'create-product',
  },
  {
    title: 'Manage Products',
    Icon: WrenchScrewdriverIcon,
    route: 'manage-products',
  },
  {
    title: 'Create Category',
    Icon: PlusCircleIcon,
    route: 'create-category',
  },
  {
    title: 'Manage Categories',
    Icon: WrenchScrewdriverIcon,
    route: 'manage-categories',
  },
  {
    title: 'Manage Orders',
    Icon: ShoppingCartIcon,
    route: 'manage-orders',
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="from-primary-700 to-primary-400 col-span-2 bg-gradient-to-b text-white">
      <ul>
        {sidebarItems.map(({ title, Icon, route }) => {
          const isHomeActive = route === '' && router.pathname === '/admin';
          const isActive = router.pathname === `/admin/${route}` || isHomeActive;

          return (
            <li key={title}>
              <div
                className={
                  isActive
                    ? 'm-2 ml-0 rounded-r-3xl bg-gradient-to-r from-cyan-500 to-blue-500'
                    : ''
                }>
                <Link
                  href={`/admin/${route}`}
                  className="flex items-center justify-center px-4 py-5">
                  {<Icon className="mr-2 h-5 w-5" />}
                  <span className="whitespace-nowrap">{title}</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
