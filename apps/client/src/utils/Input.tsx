import React from 'react';
import { Controller, Control, RegisterOptions, FieldValues } from 'react-hook-form';

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
  type?: string;
  className?: string;
}

const Input = ({
  label,
  placeholder,
  id,
  control,
  rules,
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
        render={({ field }) => (
          <input
            type={type}
            placeholder={placeholder}
            className={`py-2 px-4 ${className ?? 'rounded-xl bg-gray-100 shadow'}`}
            {...field}
          />
        )}
        control={control}
      />
    </div>
  );
};

export default Input;
