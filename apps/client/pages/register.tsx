import React from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthActions } from '@store/index';

import Button from '@utils/Button';
import Input from '@utils/Input';

const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required for creating an account')
    .max(80, 'Name should be under 80 characters'),
  email: z.string().min(1, 'Email is required for creating an account').email(),
  password: z.string().min(8, 'Password should be atleast 8 characters long'),
});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const Register: NextPage = () => {
  const { register } = useAuthActions();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(RegisterSchema),
  });

  return (
    <section className="my-5">
      <div className="mx-auto max-w-full px-5 md:w-[500px]">
        <form className="" onSubmit={handleSubmit(register)}>
          <Input
            type="text"
            label="Name"
            placeholder="Gavin Belson"
            id="name"
            control={control}
            error={errors.name}
          />
          <Input
            type="email"
            label="Email"
            placeholder="name@example.com"
            id="email"
            control={control}
            error={errors.email}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
            id="password"
            control={control}
            error={errors.password}
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary-500 mt-2 px-4 py-2 text-white">
            Create Account
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Register;
