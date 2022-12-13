import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@utils/Button';
import Input from '@utils/Input';

const RegisterSchema = z.object({
  email: z.string().min(1, 'Email is required for creating an account').email(),
  password: z.string().min(8, 'Password should be atleast 8 characters long'),
});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const Register: NextPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = useCallback(async (data) => {
    console.log(data);
  }, []);

  return (
    <section className="my-5">
      <div className="mx-auto max-w-full px-5 md:w-[500px]">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
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
