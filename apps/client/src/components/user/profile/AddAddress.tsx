import React, { useCallback, useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';

import useAuthStore from '@store/auth';
import Input from '@utils/Input';
import Button from '@utils/Button';

const addressesSchema = z.object({
  address: z.string().max(250, 'Address should not be longer than 250 characters'),
  city: z.string().max(85, 'City name should not be more than 85 characters'),
  postalCode: z.string().max(10, 'Postal code should not be more than 10 characters'),
  state: z.string().max(85, 'State should not be more than 85 characters'),
  country: z.string().max(56, 'Invalid country name'),
});

type addressesSchemaType = z.infer<typeof addressesSchema>;

const AddAddress = () => {
  const { actions } = useAuthStore();
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

        await actions.addAddress(data);

        reset();
        setOpen(false);
      } catch (err) {
        if (isAxiosError(err) && err.response)
          setError('root', { type: 'custom', message: err.response.data.err });
      }
    },
    [clearErrors, actions, reset, setError]
  );

  return (
    <>
      <Button
        className="bg-primary-500 my-5 text-white"
        onClick={() => setOpen((prevState) => !prevState)}>
        Add New Address
      </Button>
      <AnimatePresence>
        {open && (
          <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-slate-800 bg-opacity-50">
            <motion.div
              initial={{ translateY: '100vh' }}
              animate={{ translateY: 0 }}
              exit={{ translateY: '100vh' }}
              className="relative">
              <Button
                type="button"
                onClick={() => setOpen((prevState) => !prevState)}
                className="absolute right-2 top-2 bg-slate-100 p-2">
                <XMarkIcon className="text-danger h-6 w-6" />
                <div className="sr-only">Close</div>
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
                    Save Address
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddAddress;
