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
    className={`items-center justify-center rounded-lg py-2.5 px-3.5 text-sm font-semibold active:scale-105 lg:inline-flex ${className}`}>
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
    className={`items-center justify-center rounded-lg py-1.5 px-3.5 text-sm font-semibold lg:inline-flex ${className}`}>
    {children}
  </Link>
);

export default Button;
