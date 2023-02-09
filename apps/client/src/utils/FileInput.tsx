import React from 'react';
import { Controller, Control, RegisterOptions, FieldValues, FieldError } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface InputProps {
  label: string;
  placeholder?: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  error?: FieldError | undefined;
  defaultValue?: unknown;

  className?: string;
  multiple?: boolean;
}

const Input = ({
  label,
  placeholder,
  id,
  control,
  rules,
  error,
  defaultValue,
  className,
  multiple,
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
