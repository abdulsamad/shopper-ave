import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface InputProps {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  error?: FieldError | undefined;
  className?: string;
  multiple?: boolean;
  required?: boolean;
}

const Input = ({
  label,
  placeholder,
  id,
  register,
  error,
  className,
  multiple,
  required = true,
}: InputProps) => (
  <div className="my-2 flex flex-col">
    <label htmlFor={id} className="mb-2 font-medium">
      {label}
      {required && <span className="text-danger ml-1 text-xs">*</span>}
    </label>
    <input
      type="file"
      placeholder={placeholder}
      className={`file:text-primary-700 hover:file:bg-primary-100 file:bg-primary-50 block w-full py-2
            px-4 text-sm text-slate-500
            file:mr-4 file:rounded-full
            file:border-0 file:py-2
            file:px-4 file:text-sm
            file:font-semibold ${className ?? 'rounded-xl bg-gray-100 shadow'} ${
        error && 'border-danger animate-shake border transition duration-150 ease-in-out'
      }`}
      multiple={multiple}
      {...register}
    />
    {error?.message && (
      <p className="text-danger mt-2 flex gap-1 text-sm">
        <ExclamationTriangleIcon className="h-5 w-5" /> {error.message}
      </p>
    )}
  </div>
);

export default Input;
