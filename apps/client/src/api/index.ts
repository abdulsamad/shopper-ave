import axios from 'axios';

import { Product } from 'shared-types';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const welcome = async () => {
  const res = await axiosInstance.get('/');
  const data = await res.data;
  return data;
};

export interface loginReqData {
  email: string;
  password: string;
}

export interface loginResData {
  success: boolean;
  token: string;
  user: object;
}

/**
 * Login User
 * @param Request data
 * @returns Response data
 */
export const login = async ({ email, password }: loginReqData): Promise<loginResData> => {
  const res = await axiosInstance.post('/login', { email, password });
  const data = await res.data;
  return data;
};

export interface registerReqData {
  email: string;
  password: string;
  name: string;
}

export interface registerResData {
  success: boolean;
  token: string;
  user: object;
}

export const register = async ({
  name,
  email,
  password,
}: registerReqData): Promise<registerResData> => {
  const res = await axiosInstance.post('/signup', { name, email, password });
  const data = await res.data;
  return data;
};

export interface logoutResData {
  success: boolean;
  message: string;
}

export const logout = async (): Promise<logoutResData> => {
  const res = await axiosInstance.get('/logout');
  const data = await res.data;
  return data;
};

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
