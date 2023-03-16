import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import { BookmarkSquareIcon } from '@heroicons/react/24/outline';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isAxiosError } from 'axios';

import { User } from 'shared-types';

import { updateUser } from '@api/auth';
import { createFormData } from '@utils/index';
import { roleBadges } from '@utils/Badges';
import Alert from '@utils/Alert';
import Button from '@utils/Button';
import Input from '@utils/Input';
import FileInput from '@utils/FileInput';

const editModeSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(80, 'Name should be under 80 characters')
    .optional()
    .or(z.literal('')),
  photo: z.custom<File | null>((val) => val).or(z.literal(null)),
  email: z.string().min(1, 'Email cannot be empty').email().optional().or(z.literal('')),
});
// TODO: Fix refine and make atleast one item required before submit
// .refine(
//   ({ name, email, photo }) => {
//     return name !== undefined || photo !== null || email !== undefined;
//   },
//   {
//     message: 'At least one value should be added to updated',
//   }
// );

type editModeSchemaType = z.infer<typeof editModeSchema>;

interface IEditMode extends User {
  toggleEditMode: () => void;
}

const EditMode = ({ name, email, role, createdAt, toggleEditMode }: IEditMode) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
    reset,
  } = useForm<editModeSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      photo: null,
    },
    resolver: zodResolver(editModeSchema),
  });

  const onSubmit: SubmitHandler<editModeSchemaType> = useCallback(
    async (data) => {
      try {
        // Clear errors
        clearErrors();

        const formData = createFormData(data);
        await updateUser(formData);

        reset();
        toggleEditMode();
      } catch (err) {
        if (isAxiosError(err) && err.response)
          setError('root', { type: 'custom', message: err.response.data.err });
      }
    },
    [reset, clearErrors, setError, toggleEditMode]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center">
      <div className="flex flex-col space-y-4 text-center">
        {errors.root?.message && <Alert type="error" message={errors.root.message} />}
        <Input
          type="text"
          label="Name"
          placeholder={name}
          id="name"
          control={control}
          error={errors.name}
          required={false}
        />
        <FileInput
          id="photo"
          label="New Profile Photo"
          register={register('photo')}
          error={errors.photo}
          required={false}
        />
        <Input
          type="email"
          label="Email"
          placeholder={email}
          id="email"
          control={control}
          error={errors.email}
          required={false}
        />
        <div className="my-2 pt-2">
          <span className="mr-2 font-semibold">Role:</span>
          {roleBadges[role]}
        </div>
        <div>
          <span className="mr-2 font-semibold">Created On:</span>
          <span className="italic text-slate-700">{dayjs(createdAt).format('DD MMM YYYY')}</span>
        </div>
      </div>
      <p className="my-3 text-sm italic text-slate-500">
        <strong>Note:</strong> Only change those fields that you need to update. All are optional.
      </p>
      <Button type="submit" isLoading={isSubmitting} className="bg-success my-3 p-2 text-white">
        <BookmarkSquareIcon className="mr-2 h-6 w-6" />
        Save Profile
      </Button>
    </form>
  );
};

export default EditMode;
