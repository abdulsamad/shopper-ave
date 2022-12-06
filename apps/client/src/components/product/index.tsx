import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const getProduct = async (id: string): Promise<any> => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
};

interface ProductProps {
  id: string;
}

const Product = ({ id }: ProductProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['product'],
    queryFn: (): any => getProduct(id),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    keepPreviousData: false,
  });

  if (isLoading || !data) {
    return null;
  }

  // Destructuring product properties
  const { title, images, description, category, rating } = data;

  return (
    <div className="p-5 text-center">
      <Image src={images[0]} alt={title} className="mx-auto" height={180} width={340} />
      <h2 className="mt-5 font-semibold">{title}</h2>
      <p className="my-3 capitalize">{category}</p>
      <p>{description}</p>
      <progress className="mt-5 rounded-sm" value={rating} max={5}></progress>
    </div>
  );
};

export default Product;
