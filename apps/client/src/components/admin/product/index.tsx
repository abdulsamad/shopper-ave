import React, { useState } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { Product } from 'shared-types';

import { formatCurrency } from '@utils/index';
import Photos from '@utils/Photos';
import Stars from '@utils/Stars';

const productVariants: Variants = {
  hidden: {
    opacity: 0,
    translateY: '10px',
  },
  show: {
    opacity: 1,
    translateY: '0px',

    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Index = ({
  _id,
  name,
  price,
  photos,
  brand,
  category,
  ratings,
  stock,
  reviews,
  numberOfReviews,
  user,
  description,
  createdAt,
  updatedAt,
}: Product) => {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  return (
    <section className="mx-auto max-w-[700px] rounded-xl border border-solid border-slate-200 p-5 shadow">
      <div className="mb-2">
        <h3 className="text-xl">
          <time dateTime={dayjs(createdAt).format('YYYY-MM-DD hh:mm:ss')}>
            {dayjs(createdAt).format('DD MMM YYYY')}
          </time>
        </h3>
        <div className="mb-5 mt-1 text-sm font-light">
          Product #<span className="select-all italic">{_id}</span>
        </div>
      </div>
      <div className="mb-8">
        <Photos photos={photos} name={name} />
      </div>
      <div className="flex flex-col justify-between space-y-4 lg:mb-0 lg:flex-row lg:space-y-0">
        <div className="h-full text-sm">
          <div className="mb-2 flex space-x-2">
            <h4 className="font-semibold">Name</h4>
            <div>{name}</div>
          </div>
          <div className="mb-2 flex space-x-2">
            <h4 className="font-semibold">Stock</h4>
            <div>{stock}</div>
          </div>
        </div>
        <div className="h-full text-sm">
          <div className="mb-2 flex space-x-2">
            <h4 className="font-semibold">Brand</h4>
            <div>{brand}</div>
          </div>
          <div className="mb-2 flex items-center space-x-2">
            <h4 className="font-semibold">Category</h4>
            <span className="bg-primary-300 inline-block rounded-full px-2 text-sm capitalize">
              {category}
            </span>
          </div>
        </div>
        <div className="flex h-full space-x-2 text-sm">
          <h4 className="mb-2 font-semibold">Price</h4>
          <div className="italic">{formatCurrency(price)}</div>
        </div>
      </div>
      <button
        className="mt-2 flex w-full justify-center rounded-lg border border-solid border-slate-200 p-2 shadow"
        onClick={() => setDescriptionOpen((prevState) => !prevState)}>
        <span className="mr-2">Description</span>
        <motion.span
          className="origin-center"
          animate={{ rotateZ: descriptionOpen ? '180deg' : '0deg' }}>
          <ChevronDownIcon className="h-6 w-6 fill-current" />
        </motion.span>
      </button>
      <AnimatePresence mode="wait">
        {descriptionOpen && (
          <motion.div variants={productVariants} initial="hidden" animate="show" exit="hidden">
            <div className="my-5 rounded-lg bg-slate-100 p-3">{description}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="relative mt-2 flex w-full items-center justify-center rounded-lg border border-solid border-slate-200 p-2 shadow"
        onClick={() => setReviewsOpen((prevState) => !prevState)}>
        <span className="mr-2">User Reviews</span>{' '}
        <motion.span
          className="origin-center"
          animate={{ rotateZ: reviewsOpen ? '180deg' : '0deg' }}>
          <ChevronDownIcon className="h-6 w-6 fill-current" />
        </motion.span>
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span className="bg-primary-100 inline-block rounded-full px-2 text-sm capitalize">
            {numberOfReviews}
          </span>
        </div>
      </button>
      <AnimatePresence mode="wait">
        {reviewsOpen && (
          <motion.div variants={productVariants} initial="hidden" animate="show" exit="hidden">
            <div className="my-5">
              {reviews.map(({ _id, name, comment, rating, user }) => (
                <div key={_id} className="flex justify-around rounded-lg bg-slate-100 p-3">
                  <div className="flex flex-col">
                    <strong>{name}</strong>
                    <span className="italic">{comment}</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Rated</span>
                      <span className="text-sm">
                        <Stars ratings={rating} className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="mt-1 space-x-2">
                      <strong>User ID</strong>
                      <span className="select-all italic">{user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Index;
