import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Image from 'next/image';

import { Product as IProduct } from 'shared-types';

import { getProduct } from '@api/index';

const Index = ({ name, photos, category, description, ratings }: IProduct) => {
  return (
    <div className="p-5 text-center">
      {photos && (
        <Image src={photos[0].secure_url} alt={name} className="mx-auto" height={180} width={340} />
      )}
      <h2 className="mt-5 font-semibold">{name}</h2>
      <p className="my-3 capitalize">{category}</p>
      <p>{description}</p>
      <progress className="mt-5 rounded-sm" value={ratings} max={5}></progress>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const product = (await getProduct(id)).product;

  return {
    props: {
      ...product,
    },
  };
};

export default Index;
