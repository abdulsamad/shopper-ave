import React from 'react';
import { Controller, Control, RegisterOptions, FieldValues, FieldError } from 'react-hook-form';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface TextAreaProps {
  label: string;
  placeholder: string;
  id: string;
  rows: number;
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

const TextArea = ({
  label,
  placeholder,
  id,
  rows,
  control,
  rules,
  error,
  defaultValue,
  className,
  required = true,
}: TextAreaProps) => {
  return (
    <div className="my-2 flex flex-col">
      <label htmlFor={id} className="mb-2 font-medium">
        {label}
        {required && <span className="text-danger ml-1 text-xs">*</span>}
      </label>
      <Controller
        name={id}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <textarea
            rows={rows}
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

export default TextArea;
