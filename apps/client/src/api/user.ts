import { Product } from 'shared-types';

import { axiosInstance } from './axiosInstance';

export interface getProductsRes {
  success: boolean;
  products: Product[];
}

export const getProducts = async (): Promise<getProductsRes> => {
  const res = await axiosInstance.get('/products');
  const data = await res.data;
  return data;
};

export interface getProductRes {
  success: boolean;
  product: Product;
}

export const getProduct = async (id: string): Promise<getProductRes> => {
  const res = await axiosInstance.get(`/product/${id}`);
  const data = await res.data;
  return data;
};
