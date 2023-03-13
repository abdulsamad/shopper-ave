import React from 'react';
import { Controller, Control, RegisterOptions, FieldValues, FieldError } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface SelectProps {
  label: string;
  options: string[];
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
  required?: boolean;
}

const Select = ({
  label,
  options,
  id,
  control,
  rules,
  error,
  defaultValue,
  className,
  required = true,
}: SelectProps) => (
  <div className="my-2 flex flex-col">
    <label htmlFor={id} className="mb-2 font-medium">
      {label}
      {required && <span className="text-danger ml-1 text-xs">*</span>}
    </label>
    <Controller
      name={id}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref } }) => (
        <select
          ref={ref}
          onChange={onChange}
          value={value}
          className={`py-2 px-4 ${className ?? 'rounded-xl bg-gray-100 shadow'} ${
            error && 'border-danger animate-shake border transition duration-150 ease-in-out'
          }`}>
          <option value="">Please Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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

export default Select;
