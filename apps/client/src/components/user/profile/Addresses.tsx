import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

import { User } from 'shared-types';

import useAuthStore from '@store/auth';

import AddAddress from './AddAddress';

const Addresses = ({ addresses }: { addresses: User['addresses'] }) => {
  const { actions } = useAuthStore();

  if (!addresses) return null;

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 font-semibold">Addresses</h2>
      <div className="space-y-5">
        <AnimatePresence>
          {addresses.map(({ address, city, country, postalCode, state, _id }) => (
            <motion.div
              key={_id}
              initial={{ translateY: '-10px', opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: '-10px', opacity: 0 }}
              className="justify-centers relative flex items-center justify-center bg-slate-100 p-4 text-slate-700">
              <address>
                <span className="max-w-xs">{address}</span>
                <br /> {city}, {postalCode} <br />
                {state} {country}
              </address>
              <button type="button" onClick={() => actions.removeAddress(_id)}>
                <TrashIcon className="text-danger absolute right-4 top-4 h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AddAddress />
    </div>
  );
};

export default Addresses;
