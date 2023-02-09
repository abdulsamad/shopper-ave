import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Sidebar from '@components/admin/sidebar';
import Input from '@utils/Input';
import FileInput from '@utils/FileInput';
import TextArea from '@utils/TextArea';
import Button from '@utils/Button';
import Select from '@utils/Select';

const productSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
  photos: z.custom<File | null>((val) => val),
  category: z.string().min(1, 'Category should not be empty'),
  brand: z.string(),
  stock: z.string(),
});

type productSchemaType = z.infer<typeof productSchema>;

const Index: NextPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<productSchemaType>({
    defaultValues: {
      name: '',
      price: '',
      photos: null,
      description: '',
      category: '',
      brand: '',
      stock: '',
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<productSchemaType> = useCallback(async (data) => {
    //
    console.log(data);
  }, []);

  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <div className="col-span-10">
        <div className="container">
          <h1 className="my-3 text-center text-4xl text-gray-700">Add New Product</h1>
        </div>
        <form
          className="mx-auto flex w-full flex-col gap-2 p-5 lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            id="name"
            label="Name"
            placeholder="Product Name"
            control={control}
            error={errors.name}
          />
          <TextArea
            rows={4}
            id="description"
            label="Product Description"
            placeholder="Enter product description here"
            control={control}
            error={errors.description}
          />
          <FileInput id="photos" label="Photos" control={control} error={errors.photos} multiple />
          <Select
            label="Category"
            options={['John', 'Wick']}
            id="category"
            control={control}
            error={errors.category}
          />
          <Input
            type="number"
            id="price"
            label="Price"
            placeholder="20"
            control={control}
            error={errors.price}
          />
          <Input
            type="number"
            id="stock"
            label="Stock"
            placeholder="Enter stock quantity"
            control={control}
            error={errors.stock}
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
