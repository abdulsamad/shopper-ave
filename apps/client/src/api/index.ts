import axios from 'axios';

export const welcome = async () => {
  const res = await axios.post('/');
  const data = await res.data;
  return data;
};

export const logout = async () => {
  const res = await axios.get('/logout');
  const data = await res.data;
  return data;
};
