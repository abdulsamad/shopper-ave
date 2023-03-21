import React, { useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthActions, useIsAuthenticated } from '@store/index';

import Button from '@utils/Button';
import Input from '@utils/Input';
import FileInput from '@utils/FileInput';
import { createFormData } from '@utils/index';
import Alert from '@utils/Alert';

const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required for creating an account')
      .max(80, 'Name should be under 80 characters'),
    email: z.string().min(1, 'Email is required for creating an account').email(),
    photo: z.custom<FileList | null>((val) => val),
    password: z.string().min(8, 'Password should be atleast 8 characters long'),
    confirmPassword: z.string().min(8, 'Confirm Password should also be atleast 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password and Confirm Passwords don't match!",
  });

type registerSchemaType = z.infer<typeof RegisterSchema>;

const Register: NextPage = () => {
  const { register: authRegister } = useAuthActions();
  const isAuthenticated = useIsAuthenticated();

  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
    reset,
  } = useForm<registerSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      photo: null,
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const onSubmit: SubmitHandler<registerSchemaType> = useCallback(
    async (data) => {
      try {
        // Clear errors
        clearErrors();

        const formData = createFormData(data);
        await authRegister(formData);

        reset();
      } catch (err) {
        if (err instanceof Error) setError('root', { type: 'custom', message: err.message });
      }
    },
    [reset, clearErrors, setError, authRegister]
  );

  return (
    <section className="my-5 flex-1">
      <div className="mx-auto max-w-full px-5 md:w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.root?.message && <Alert type="error" message={errors.root.message} />}
          <Input
            type="text"
            label="Name"
            placeholder="John Doe"
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
          <FileInput
            id="photo"
            label="Photo"
            register={register('photo')}
            error={errors.photo}
            required={false}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
            id="password"
            control={control}
            error={errors.password}
          />
          <Input
            type="text"
            label="Confirm Password"
            placeholder="Enter password again"
            id="confirmPassword"
            control={control}
            error={errors.confirmPassword}
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="hover:bg-primary-500 from-primary-600 to-primary-400 mt-2 w-full bg-gradient-to-r py-2 text-lg text-white">
            Create Account
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Register;
