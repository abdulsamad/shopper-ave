import React from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '@utils/Button';
import Input from '@utils/Input';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required for login').email(),
  password: z.string().min(8, 'Password should be atleast 8 characters long'),
});

const Login: NextPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  return (
    <section className="my-5">
      <div className="mx-auto max-w-full px-5 md:w-[500px]">
        <form
          className=""
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}>
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
          <Button className="bg-primary hover:bg-primary-500 mt-2 px-4 py-2 text-white">
            Log In
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
