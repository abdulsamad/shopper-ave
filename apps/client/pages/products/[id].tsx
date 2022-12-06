import React from 'react';
import { useRouter } from 'next/router';
import Product from '@components/product';

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id === 'object') return null;

  return <Product id={id} />;
};

export default Index;
