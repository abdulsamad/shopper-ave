import { axiosInstance } from './axiosInstance';

import { Product } from 'shared-types';

export interface createProductRes {
  success: boolean;
  products: Product[];
}

export const createProduct = async (details: FormData): Promise<createProductRes> => {
  const res = await axiosInstance.post('/admin/product/add', details, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.data;
  return data;
};

export interface ICreateCategoryRes {
  success: boolean;
}

export const createCategory = async ({ name }: { name: string }): Promise<ICreateCategoryRes> => {
  const res = await axiosInstance.post(
    '/admin/category/add',
    { name },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const data = await res.data;
  return data;
};
