import React from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';

import Button from '@utils/Button';
import Input from '@utils/Input';

interface Inputs {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
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
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
            id="password"
            control={control}
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
