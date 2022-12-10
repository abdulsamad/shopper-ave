import React from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  id?: string;
  className?: string;
}

const Input = ({ label, placeholder, type = 'text', id, className, ...props }: InputProps) => {
  return (
    <div className="my-2 flex flex-col">
      <label htmlFor={id} className="mb-2 font-medium">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={`py-2 px-4 ${className ?? 'rounded-xl bg-gray-100 shadow'}`}
        {...props}
      />
    </div>
  );
};

export default Input;
