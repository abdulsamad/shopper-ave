import React, { MouseEventHandler } from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';

import { ButtonLoader } from './Loader';

interface ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  isLoading = false,
  disabled,
  onClick,
  type,
  className,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={isLoading || disabled}
    className={`items-center justify-center rounded-lg py-1.5 px-3.5 active:scale-105 lg:inline-flex ${
      isLoading && 'hover:cursor-wait'
    } ${className}`}
    {...props}>
    {isLoading ? <ButtonLoader /> : children}
  </button>
);

interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const LinkButton = ({ children, type, className, ...props }: LinkButtonProps) => (
  <Link
    type={type}
    className={`items-center justify-center rounded-lg py-1.5 px-3.5 lg:inline-flex ${className}`}
    {...props}>
    {children}
  </Link>
);

export default Button;
