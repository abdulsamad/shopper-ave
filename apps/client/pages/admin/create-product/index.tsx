import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';

import { createProduct } from '@api/admin';
import AdminLayout from '@components/admin/layout';
import Input from '@utils/Input';
import FileInput from '@utils/FileInput';
import TextArea from '@utils/TextArea';
import Button from '@utils/Button';
import Select from '@utils/Select';
import Alert from '@utils/Alert';
import { createFormData } from '@utils/index';

const productSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
  photos: z.custom<FileList | null>((val) => val),
  category: z.string().min(1, 'Category should not be empty'),
  brand: z.string(),
  stock: z.string(),
});

type productSchemaType = z.infer<typeof productSchema>;

const Index: NextPage = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
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

  const onSubmit: SubmitHandler<productSchemaType> = useCallback(
    async (data) => {
      try {
        // Clear errors
        clearErrors();

        const formData = createFormData(data);
        await createProduct(formData);

        reset();
      } catch (err) {
        if (isAxiosError(err) && err.response)
          setError('root', { type: 'custom', message: err.response.data.err });
      }
    },
    [reset, clearErrors, setError]
  );

  return (
    <AdminLayout
      title={
        <>
          Create <span className="text-primary">Product</span>
        </>
      }>
      <form
        className="mx-auto flex w-full flex-col gap-2 p-5 lg:w-1/2"
        onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.message && <Alert type="error" message={errors.root.message} />}
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
        <FileInput
          id="photos"
          label="Photos"
          register={register('photos')}
          error={errors.photos}
          multiple
        />
        <Select
          label="Category"
          options={['hoodie', 'electronics']}
          id="category"
          control={control}
          error={errors.category}
        />
        <Input
          type="text"
          id="brand"
          label="Brand"
          placeholder="e.g Nike"
          control={control}
          error={errors.brand}
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
        <Button type="submit" isLoading={isSubmitting} className="bg-primary text-white">
          Submit
        </Button>
      </form>
    </AdminLayout>
  );
};

export default Index;
