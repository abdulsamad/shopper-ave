import React from 'react';
import { Product } from 'shared-types';

import Item from './Item';

interface IProduct {
  products: Product[];
}

const Products = ({ products }: IProduct) => {
  return (
    <div className="container mx-auto">
      <section className="grid grid-cols-2 place-items-center gap-5 p-5 lg:grid-cols-4">
        {products.map(({ ...product }) => (
          <Item key={product._id} {...product} />
        ))}
      </section>
    </div>
  );
};

export default Products;
