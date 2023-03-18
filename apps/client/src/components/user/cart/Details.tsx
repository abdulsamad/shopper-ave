import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

import { AddressItem } from 'shared-types';

import { useUser } from '@store/index';
import Input from '@utils/Input';
import Select from '@utils/Select';
import Button from '@utils/Button';
import AddAddress from '../profile/AddAddress';

const detailsSchema = z.object({
  address: z.string().min(0, 'Please select an address for delivery'),
  phone: z.coerce.number().min(6),
});

type detailsSchemaType = z.infer<typeof detailsSchema>;

interface IDetails {
  addresses: AddressItem[];
  defaultValue: AddressItem | null;
}

const Details = ({ addresses, defaultValue }: IDetails) => {
  const router = useRouter();
  const user = useUser();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<detailsSchemaType>({
    resolver: zodResolver(detailsSchema),
  });
  const userHasAddress = addresses.length > 0;

  const onSubmit: SubmitHandler<detailsSchemaType> = useCallback(
    async ({ address, phone }) => {
      if (user?.addresses) {
        const selectedAddress = user.addresses.find((item) => item.address === address);

        if (!selectedAddress) return;

        await router.push({
          pathname: '/checkout',
          query: { id: selectedAddress._id, phone },
        });
      }
    },
    [router, user]
  );

  return (
    <div>
      {!userHasAddress && (
        <div className="text-center">
          <AddAddress />
        </div>
      )}
      <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-5">
          {userHasAddress && (
            <Select
              label="Select an Address for delivery"
              defaultValue={defaultValue}
              options={addresses.map(({ address }) => address)}
              id="address"
              control={control}
              error={errors.address}
            />
          )}
        </div>
        <div className="my-5">
          <Input
            type="numeric"
            label="Enter for Phone No. for contact"
            placeholder="+1 613-555-0172"
            id="phone"
            control={control}
            error={errors.phone}
          />
        </div>
        <p className="my-3 text-center text-xs">
          <span className="">Note:</span> Please select an address to continue
        </p>
        <Button
          type="submit"
          disabled={!userHasAddress}
          isLoading={isSubmitting}
          className={`${
            userHasAddress
              ? 'from-primary-600 to-primary-400 my-3 bg-gradient-to-r'
              : 'disabled:bg-gray-300'
          } flex w-full whitespace-nowrap py-2 px-0 text-white`}>
          <ShoppingBagIcon className="mr-2 h-6 w-6" /> Proceed to Checkout
        </Button>
      </form>
    </div>
  );
};

export default Details;
