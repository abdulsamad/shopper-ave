import axios from 'axios';

export const welcome = async () => {
  const req = await axios.post('/');
  const res = await req.data;
  return res;
};
