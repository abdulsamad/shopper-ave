import React, { useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';

import { useAuthActions, useIsAuthenticated } from '@store/index';
import Button from '@utils/Button';
import Input from '@utils/Input';
import Alert from '@utils/Alert';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required for login').email(),
  password: z.string().min(8, 'Password should be atleast 8 characters long'),
});

type loginSchemaType = z.infer<typeof loginSchema>;

const Login: NextPage = () => {
  const { login } = useAuthActions();
  const isAuthenticated = useIsAuthenticated();

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
    reset,
  } = useForm<loginSchemaType>({
    // ! Remove default admin values
    defaultValues: { email: 'john@example.com', password: 'john@123' },
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const onSubmit: SubmitHandler<loginSchemaType> = useCallback(
    async (data) => {
      try {
        // Clear errors
        clearErrors();

        await login(data);

        reset();
      } catch (err) {
        if (isAxiosError(err) && err.response)
          setError('root', { type: 'custom', message: err.response.data.err });
      }
    },
    [login, reset, clearErrors, setError]
  );

  return (
    <section className="my-5">
      <div className="mx-auto max-w-full px-5 md:w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.root?.message && <Alert type="error" message={errors.root.message} />}
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
            isLoading={isSubmitting}
            className="from-primary-600  to-primary-400 hover:bg-primary-500 mt-2 w-full bg-gradient-to-r px-4 py-2 text-white">
            Log In
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
