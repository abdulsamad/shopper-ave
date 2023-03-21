import React, { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { Order, OrderItem } from 'shared-types';

import { LinkButton } from '@utils/Button';
import { formatCurrency } from '@utils/index';
import { statusBadges } from '@utils/Badges';

const orderVariants: Variants = {
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

const OrderItem = ({
  _id,
  orderItems,
  orderStatus,
  shippingAmount,
  shippingInfo,
  taxAmount,
  totalAmount,
  deliveredAt,
  createdAt,
}: Order) => {
  const [open, setOpen] = useState(false);
  const { address, city, country, postalCode, state } = shippingInfo;
  const orderedOn = dayjs(createdAt);

  return (
    <section className="mx-auto max-w-[700px] rounded-xl border border-solid border-slate-200 p-5 shadow">
      <div className="mb-4">
        <h3 className="text-lg">
          <time dateTime={dayjs(orderedOn).format('YYYY-MM-DD hh:mm:ss')}>
            {dayjs(orderedOn).format('DD MMM YYYY')}
          </time>
        </h3>
        <div className="mt-1 text-sm font-light">
          Order #<span className="select-all italic">{_id}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-4 lg:mb-0 lg:flex-row lg:space-y-0">
        <div>
          <h4 className="mb-2 font-semibold">Shipping Address</h4>
          <address className="text-slate-700">
            <span className="max-w-xs">{address}</span>
            <br /> {city}, {postalCode} <br />
            {state} {country}
          </address>
        </div>
        <div className="h-full text-sm">
          <div>
            <h4 className="mb-2 font-semibold">Delivery Status</h4>
            <div>{statusBadges[orderStatus]}</div>
          </div>
          {orderStatus === 'delivered' && deliveredAt && (
            <div className="my-4">
              <h4 className="font-semibold">Delivered On</h4>
              <div className="text-slate-700">
                {dayjs(deliveredAt.toString()).format('DD MMM YYYY')}
              </div>
            </div>
          )}
        </div>
        <table className="table-fixed border-collapse">
          <caption className="mb-2 font-semibold">Orders Summary</caption>
          <tbody className="space-y-2 text-slate-700">
            <tr>
              <td className="px-2 text-left">Items(s) Total:</td>
              <td className="px-3">{formatCurrency(totalAmount)}</td>
            </tr>
            <tr>
              <td className="px-2 text-left">Shipping</td>
              <td className="px-3">{formatCurrency(shippingAmount)}</td>
            </tr>
            <tr>
              <td className="px-2 text-left">Tax</td>
              <td className="px-3">{formatCurrency(taxAmount)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td className="px-2 py-2 text-left">Grand Total</td>
              <td className="px-3 py-2">
                {formatCurrency(shippingAmount + totalAmount + taxAmount)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button
        className="mt-2 flex w-full justify-center rounded-lg border border-solid border-slate-200 p-2 shadow"
        onClick={() => setOpen((prevState) => !prevState)}>
        <span className="mr-2">View Products</span>
        <motion.span className="origin-center" animate={{ rotateZ: open ? '180deg' : '0deg' }}>
          <ChevronDownIcon className="h-6 w-6 fill-current" />
        </motion.span>
      </button>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div variants={orderVariants} initial="hidden" animate="show" exit="hidden">
            {orderItems.map((order) => (
              <OrderProductItem key={order.product} {...order} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const orderItemVariants: Variants = {
  hidden: {
    opacity: 0.2,
    scaleY: 0.2,
  },
  show: {
    opacity: 1,
    scaleY: 1,
  },
};

const OrderProductItem = ({ image, name, price, product, quantity }: OrderItem) => {
  return (
    <motion.div
      variants={orderItemVariants}
      className="mt-5 flex origin-top space-x-2 overflow-hidden rounded-lg border border-solid border-slate-200 p-3.5 shadow lg:space-x-4">
      <Image
        src={image}
        alt="Shopping"
        className="aspect-square rounded-2xl object-cover"
        width={100}
        height={100}
      />
      <div className="flex flex-1 flex-col px-2 lg:px-0">
        <div className="flex flex-col">
          <div className="text-slate-800">{name}</div>
          <div className="mt-1 text-sm text-slate-500">Quantity: {quantity}</div>
        </div>
        <LinkButton
          href={`/product/${product}`}
          className="mt-3 border-2 border-solid border-slate-200 px-2 text-sm text-sky-400">
          View Product
        </LinkButton>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="mt-2 text-sm font-semibold text-slate-600 lg:text-base">
          {formatCurrency(price)}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderItem;
