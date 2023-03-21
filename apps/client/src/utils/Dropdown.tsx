import React, { useCallback, useState } from 'react';
import Link, { LinkProps } from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

interface IDropdown {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  className?: string;
  btnClasses?: string;
}

const Dropdown = ({ children, title, icon, className, btnClasses }: IDropdown) => {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return (
    <div className={`group relative ${className}`}>
      <button
        className={`text-blue group-hover:border-grey-light flex cursor-pointer items-center rounded-t-lg p-2 ${btnClasses}`}
        onClick={handleClick}>
        {icon && <div className="mr-2">{icon}</div>}
        <span className="hidden md:inline-block">{title}</span>
        <motion.div className="ml-1 origin-center" animate={{ rotateZ: open ? '180deg' : '0deg' }}>
          <ChevronDownIcon className="h-4 w-4 fill-current" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0.5, scaleY: 0.5 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0.5, scaleY: 0 }}
            onClick={() => setOpen(false)}
            className="absolute right-0 z-40 w-[140px] origin-top items-center rounded-b-lg bg-white p-1 shadow-lg group-hover:visible lg:right-auto lg:w-full">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface IDropdownLink extends LinkProps {
  children: React.ReactNode;
  divider?: boolean;
  className?: string;
}

export const DropdownLink = ({ children, divider, href, ...props }: IDropdownLink) => {
  if (divider) {
    return (
      <>
        <hr className="border-grey-ligght mx-2 border-t" />
        <Link href={href} className="hover:bg-grey-lighter block px-4 py-2 text-black" {...props}>
          {children}
        </Link>
      </>
    );
  }

  return (
    <Link href={href} className="hover:bg-grey-lighter block px-4 py-2 text-black" {...props}>
      {children}
    </Link>
  );
};

export interface IDropdownButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  divider?: boolean;
}

export const DropdownButton = ({ children, divider, ...props }: IDropdownButton) => {
  if (divider) {
    return (
      <>
        <hr className="border-grey-ligght mx-2 border-t" />
        <button className="hover:bg-grey-lighter block px-4 py-2 text-black" {...props}>
          {children}
        </button>
      </>
    );
  }

  return (
    <button className="hover:bg-grey-lighter block px-4 py-2 text-black" {...props}>
      {children}
    </button>
  );
};

export default Dropdown;
