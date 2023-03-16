import { User } from 'shared-types';

import { axiosInstance } from './axiosInstance';

export interface loginReqData {
  email: string;
  password: string;
}

export interface loginResData {
  success: boolean;
  token: string;
  user: User;
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

export interface registerResData {
  success: boolean;
  token: string;
  user: User;
}

export const register = async (userInfo: FormData): Promise<registerResData> => {
  const res = await axiosInstance.post('/signup', userInfo, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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

export interface updateUserResData {
  success: boolean;
  user: User;
}

export const updateUser = async (userInfo: FormData): Promise<updateUserResData> => {
  const res = await axiosInstance.put('/dashboard/update', userInfo, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.data;
  return data;
};
