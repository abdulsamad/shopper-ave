import { Product } from 'shared-types';

import { axiosInstance } from './axiosInstance';

export interface IGetProductsRes {
  success: boolean;
  products: Product[];
}

export const getProducts = async (): Promise<IGetProductsRes> => {
  const res = await axiosInstance.get('/products');
  const data = await res.data;
  return data;
};

export interface IGetProductRes {
  success: boolean;
  product: Product;
}

export const getProduct = async (id: string): Promise<IGetProductRes> => {
  const res = await axiosInstance.get(`/product/${id}`);
  const data = await res.data;
  return data;
};

export const getStripeAPIKey = async (): Promise<{ key: string }> => {
  const res = await axiosInstance.get('/payment/stripekey');
  const data = await res.data;
  return data;
};

export interface ICapturePaymenRes {
  success: boolean;
  client_secret: string;
  amount: number;
}

export const capturePayment = async (amount: number): Promise<ICapturePaymenRes> => {
  const res = await axiosInstance.post(
    '/payment/capturestripe',
    { amount },
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
