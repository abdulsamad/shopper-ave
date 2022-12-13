import React from 'react';
import { Controller, Control, RegisterOptions, FieldValues, FieldError } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface InputProps {
  label: string;
  placeholder: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  error?: FieldError | undefined;
  defaultValue?: unknown;
  type?: string;
  className?: string;
}

const Input = ({
  label,
  placeholder,
  id,
  control,
  rules,
  error,
  defaultValue,
  type = 'text',
  className,
}: InputProps) => {
  return (
    <div className="my-2 flex flex-col">
      <label htmlFor={id} className="mb-2 font-medium">
        {label}
      </label>
      <Controller
        name={id}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <input
            type={type}
            placeholder={placeholder}
            className={`py-2 px-4 ${className ?? 'rounded-xl bg-gray-100 shadow'} ${
              error && 'border-danger animate-shake border transition duration-150 ease-in-out'
            }`}
            {...field}
          />
        )}
        control={control}
      />
      {error?.message && (
        <p className="text-danger mt-2 flex gap-1 text-sm">
          <ExclamationTriangleIcon className="h-5 w-5" /> {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
