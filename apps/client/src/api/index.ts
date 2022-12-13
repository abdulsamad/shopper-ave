import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export const welcome = async () => {
  const res = await axios.get('/');
  const data = await res.data;
  return data;
};

export const logout = async () => {
  const res = await axios.get('/logout');
  const data = await res.data;
  return data;
};
