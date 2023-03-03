import { axiosInstance } from './axiosInstance';

export const welcome = async () => {
  const res = await axiosInstance.get('/');
  const data = await res.data;
  return data;
};
