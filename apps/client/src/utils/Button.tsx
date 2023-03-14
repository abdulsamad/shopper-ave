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
  paddingClasses?: string;
}

export const Button = ({
  children,
  isLoading = false,
  disabled,
  onClick,
  type,
  paddingClasses = 'py-1.5 px-3.5',
  className,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={isLoading || disabled}
    className={`items-center justify-center whitespace-nowrap rounded-lg active:scale-105 lg:inline-flex ${paddingClasses} ${
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
  paddingClasses?: string;
}

export const LinkButton = ({
  children,
  type,
  className,
  paddingClasses = 'py-1.5 px-3.5',
  ...props
}: LinkButtonProps) => (
  <Link
    type={type}
    className={`items-center justify-center whitespace-nowrap rounded-lg lg:inline-flex ${paddingClasses} ${className}`}
    {...props}>
    {children}
  </Link>
);

export default Button;
