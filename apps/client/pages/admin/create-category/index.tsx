import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Sidebar from '@components/admin/sidebar';
import Input from '@utils/Input';
import Button from '@utils/Button';
import Alert from '@utils/Alert';

const categorySchema = z.object({
  name: z.string(),
});

type categorySchemaType = z.infer<typeof categorySchema>;

const Index: NextPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<categorySchemaType>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit: SubmitHandler<categorySchemaType> = useCallback(async (data) => {
    console.log(data);
  }, []);

  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <div className="col-span-10">
        <div className="container">
          <h1 className="my-3 text-center text-4xl text-gray-700">
            Create <span className="text-primary">Category</span>
          </h1>
        </div>
        <form
          className="mx-auto flex w-full flex-col gap-2 p-5 lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}>
          {errors.root?.message && <Alert type="error" message={errors.root.message} />}
          <Input
            type="text"
            id="name"
            label="Name"
            placeholder="Category name"
            control={control}
            error={errors.name}
          />
          <Button type="submit" className="bg-primary text-white">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;
