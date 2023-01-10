import React from 'react';
import { Product } from 'shared-types';

import Item from './Item';

interface IProduct {
  products: Product[];
}

const Products = ({ products }: IProduct) => {
  return (
    <div className="grid auto-rows-fr grid-cols-2 place-items-center gap-5 p-5 lg:grid-cols-4">
      {products.map(({ ...product }) => (
        <Item key={product._id} {...product} />
      ))}
    </div>
  );
};

export default Products;
