import React, { MouseEventHandler } from 'react';
import Link from 'next/link';

import { ButtonLoader } from './Loader';

interface ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button = ({ children, isLoading = false, onClick, type, className }: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={isLoading}
    className={`h-10 items-center justify-center rounded-lg py-1.5 px-3.5 text-sm font-semibold active:scale-105 lg:inline-flex ${
      isLoading && 'hover:cursor-wait'
    } ${className}`}>
    {isLoading ? <ButtonLoader /> : children}
  </button>
);

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const LinkButton = ({ href, children, onClick, className }: LinkButtonProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`h-10 items-center justify-center rounded-lg py-1.5 px-3.5 text-sm font-semibold lg:inline-flex ${className}`}>
    {children}
  </Link>
);

export default Button;
