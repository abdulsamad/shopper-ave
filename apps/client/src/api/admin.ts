import { Order, Product } from 'shared-types';

import { axiosInstance } from './axiosInstance';

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

export interface IGetProducts {
  success: boolean;
  products: Product[];
}

export const getProducts = async (): Promise<IGetProducts> => {
  const res = await axiosInstance.get('/admin/products', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.data;
  return data;
};

export interface IGetOrders {
  success: boolean;
  orders: Order[];
}

export const getOrders = async (): Promise<IGetOrders> => {
  const res = await axiosInstance.get('/admin/orders', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.data;
  return data;
};
