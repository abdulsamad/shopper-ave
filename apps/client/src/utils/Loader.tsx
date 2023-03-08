import React from 'react';

interface IButtonLoader {
  className?: string;
}

export const ButtonLoader = ({ className = 'text-2xl text-white bg-current' }: IButtonLoader) => (
  <div className="debug-border flex h-8 w-full items-center justify-center">
    <div
      className={`after:content[''] before:content[''] after:[animation-delay: 0.45s] before:[animation-delay: 0.45s] animate-button-loader-middle after:animate-button-loader-side before:animate-button-loader-side relative my-2.5 box-border h-1.5 w-1.5 rounded before:absolute before:top-1/2 before:-left-4 before:box-border before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded before:bg-current after:absolute after:top-1/2 after:left-4 after:box-border after:h-1.5 after:w-1.5 after:-translate-y-1/2 after:rounded after:bg-current ${className}`}
    />
  </div>
);
