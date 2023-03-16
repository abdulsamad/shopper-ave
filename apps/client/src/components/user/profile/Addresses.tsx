import React, { useCallback, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { User } from 'shared-types';

import Input from '@utils/Input';
import Button from '@utils/Button';
import { addAddress } from '@api/user';

const addressesSchema = z.object({
  address: z.string().max(250, 'Address should not be longer than 250 characters'),
  city: z.string().max(85, 'City name should not be more than 85 characters'),
  postalCode: z.string().max(10, 'Postal code should not be more than 10 characters'),
  state: z.string().max(85, 'State should not be more than 85 characters'),
  country: z.string().max(56, 'Invalid country name'),
});

type addressesSchemaType = z.infer<typeof addressesSchema>;

const Addresses = ({ addresses }: { addresses: User['addresses'] }) => {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
    reset,
  } = useForm<addressesSchemaType>({
    defaultValues: {
      address: '',
      city: '',
      postalCode: '',
      state: '',
      country: '',
    },
    resolver: zodResolver(addressesSchema),
  });

  const onSubmit: SubmitHandler<addressesSchemaType> = useCallback(
    async (data) => {
      try {
        // Clear errors
        clearErrors();

        await addAddress(data);

        reset();
        setOpen(false);
      } catch (err) {
        if (isAxiosError(err) && err.response)
          setError('root', { type: 'custom', message: err.response.data.err });
      }
    },
    [reset, clearErrors, setError]
  );

  if (!addresses) return null;

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 font-semibold">Addresses</h2>
      <div className="space-y-5">
        {addresses.map(({ address, city, country, postalCode, state, _id }) => (
          <div
            key={_id}
            className="justify-centers relative flex items-center justify-center bg-slate-100 p-4 text-slate-700">
            <address>
              <span className="max-w-xs">{address}</span>
              <br /> {city}, {postalCode} <br />
              {state} {country}
            </address>
            <button>
              <TrashIcon className="text-danger absolute right-4 top-4 h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <Button className="my-2" onClick={() => setOpen((prevState) => !prevState)}>
        Add New
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-slate-800 bg-opacity-50">
            <Button type="button" onClick={() => setOpen((prevState) => !prevState)}>
              <XMarkIcon className="text-dark absolute right-2 top-2 h-6 w-6 p-2 text-red-600" />
            </Button>
            <div className="rounded-md bg-white px-16 py-14 text-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  label="Address"
                  placeholder="Your street, house..."
                  id="address"
                  control={control}
                  error={errors.address}
                  required={false}
                />
                <Input
                  type="text"
                  label="City"
                  placeholder="Toronto"
                  id="city"
                  control={control}
                  error={errors.city}
                  required={false}
                />
                <Input
                  type="text"
                  label="Postal Code"
                  placeholder="M1R 0E9"
                  id="postalCode"
                  control={control}
                  error={errors.postalCode}
                  required={false}
                />
                <Input
                  type="text"
                  label="State"
                  placeholder="Ontario"
                  id="state"
                  control={control}
                  error={errors.state}
                  required={false}
                />
                <Input
                  type="text"
                  label="Country"
                  placeholder="Canada"
                  id="country"
                  control={control}
                  error={errors.country}
                  required={false}
                />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="bg-primary-500 my-3 text-white">
                  Add New Address
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Addresses;
