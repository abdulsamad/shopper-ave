import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import Product from './Product';

const getProducts = async (): Promise<any[]> => {
  const res = await axios.get('https://fakestoreapi.com/products');
  return res.data;
};

const Products = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading || !data) {
    return <div className="animate-bounce p-5 text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 place-items-center gap-5 p-5">
      {data.map(({ id, title, image, price, category }) => (
        <Product key={id} id={id} title={title} image={image} price={price} category={category} />
      ))}
    </div>
  );
};

export default Products;