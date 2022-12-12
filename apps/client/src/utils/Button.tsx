import React, { MouseEventHandler } from 'react';
import Link from 'next/link';

interface ButtonProps {
  color: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button = ({ color, children, onClick, type, className }: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-${color} hover:bg-${color}-500 items-center rounded-lg py-1.5 px-3.5 text-sm font-semibold lg:inline-flex ${className}`}>
    {children}
  </button>
);

interface LinkButtonProps {
  href: string;
  color: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const LinkButton = ({ href, onClick, color, className, children }: LinkButtonProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`bg-${color} hover:bg-${color}-500 items-center rounded-lg py-1.5 px-3.5 text-sm font-semibold lg:inline-flex ${className}`}>
    {children}
  </Link>
);

export default Button;
