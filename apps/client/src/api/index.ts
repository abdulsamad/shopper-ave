import axios from 'axios';

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

export const logout = async () => {
  const res = await axiosInstance.get('/logout');
  const data = await res.data;
  return data;
};
