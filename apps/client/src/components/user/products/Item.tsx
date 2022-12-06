import React, { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ItemProps {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
}

const Item = ({ id, title, image, category, price }: ItemProps) => {
  const formatCurrency = useCallback((price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  }, []);

  return (
    <Link className="text-center" href={`/products/${encodeURIComponent(id)}`}>
      <div className="h-[150px] w-full overflow-hidden object-contain">
        <Image className="mx-auto" src={image} alt={title} height={200} width={200} />
      </div>
      <div className="my-4">
        <h3 className="font-bold">{title}</h3>
        <div className="d-flex">
          <span className="italic">{formatCurrency(price)}</span>
          <span className="ml-4 capitalize">{category}</span>
        </div>
      </div>
    </Link>
  );
};

export default Item;
