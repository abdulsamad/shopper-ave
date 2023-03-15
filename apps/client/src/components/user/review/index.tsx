import React, { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';

import TextArea from '@utils/TextArea';
import Button from '@utils/Button';
import Alert from '@utils/Alert';
import { addReview, getReviews } from '@api/user';

const reviewSchema = z.object({
  comment: z.string(),
  rating: z.coerce.number().min(1).max(5),
});

type reviewSchemaType = z.infer<typeof reviewSchema>;

const Index = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<reviewSchemaType>({
    defaultValues: {
      comment: '',
      rating: 5,
    },
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit: SubmitHandler<reviewSchemaType> = useCallback(
    async (data) => {
      try {
        // Clear errors
        clearErrors();

        await addReview({
          ...data,
          productId: id,
        });

        reset();
      } catch (err) {
        if (isAxiosError(err) && err.response)
          setError('root', { type: 'custom', message: err.response.data.err });
      }
    },
    [reset, clearErrors, setError, id]
  );

  getReviews(id).then((res) => console.log(res));

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold">Ratings and Reviews</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.message && <Alert type="error" message={errors.root.message} />}
        <TextArea
          id="comment"
          label="Write a Review"
          placeholder="Write a new review about this product..."
          rows={4}
          control={control}
          error={errors.comment}
        />
        <div className="my-2 flex flex-col space-y-2">
          <label htmlFor="rating">Please select a rating below</label>
          <input type="range" min={1} max={5} {...register('rating')} />
          {errors.rating?.message}
        </div>
        <Button type="submit" className="bg-primary-500 my-2 text-white" isLoading={isSubmitting}>
          Add a Review
        </Button>
      </form>
    </div>
  );
};

export default Index;
