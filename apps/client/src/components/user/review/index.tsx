import React, { useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as ActiveStarIcon } from '@heroicons/react/24/solid';

import { Review } from 'shared-types';

import { useUser } from '@store/index';
import { addReview } from '@api/user';
import TextArea from '@utils/TextArea';
import Button from '@utils/Button';
import Alert from '@utils/Alert';
import Stars from '@utils/Stars';

const reviewSchema = z.object({
  comment: z.string().min(3, 'Comment should have more than 3 characters'),
  rating: z.coerce.number().min(1).max(5),
});

type reviewSchemaType = z.infer<typeof reviewSchema>;

interface IProps {
  productId: string;
  reviews: Review[];
}

const Index = ({ productId, reviews }: IProps) => {
  const user = useUser();
  const [active, setActive] = useState(true);
  const [userCanReview, setUserCanReview] = useState(() =>
    reviews.findIndex((item) => item.user !== user?._id)
  );
  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<reviewSchemaType>({
    defaultValues: {
      comment: '',
      rating: 5,
    },
    resolver: zodResolver(reviewSchema),
  });

  const handleHover = (hoverValue: number) => {
    if (!active) return null;

    setValue('rating', hoverValue);
  };

  const handleClick = (clickValue: number) => {
    setValue('rating', clickValue);
    setActive(false);
  };

  const onSubmit: SubmitHandler<reviewSchemaType> = useCallback(
    async (data) => {
      try {
        // Clear errors
        clearErrors();

        await addReview({
          ...data,
          productId,
        });

        reset();
        setUserCanReview(0);
      } catch (err) {
        if (isAxiosError(err) && err.response)
          setError('root', { type: 'custom', message: err.response.data.err });
      }
    },
    [reset, clearErrors, setError, productId]
  );

  return (
    <div className="mx-auto max-w-[700px] px-2">
      {reviews.length > 1 && <h2 className="text-xl font-semibold">Ratings and Reviews</h2>}
      {isSubmitSuccessful && (
        <div className="my-3">
          <Alert type="success" message="Thanks. Your review is added to the product." />
        </div>
      )}
      {Boolean(userCanReview) && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.root?.message && <Alert type="error" message={errors.root.message} />}
          <div className="mt-3">
            <div className="mb-2">Please rate the product to add a review</div>
            {[1, 2, 3, 4, 5].map((i) => {
              const rating = watch('rating');
              const active = i <= rating;

              return (
                <button
                  key={i}
                  type="button"
                  className=""
                  onClick={() => handleClick(i)}
                  onMouseEnter={() => handleHover(i)}
                  onMouseLeave={() => handleHover(rating)}>
                  <span className="sr-only">{i} star rating</span>
                  {active ? (
                    <ActiveStarIcon className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <StarIcon className="h-6 w-6" />
                  )}
                </button>
              );
            })}
            {errors.rating?.message}
          </div>
          <TextArea
            id="comment"
            label="Write a Review"
            placeholder="Write a new review about this product..."
            rows={4}
            control={control}
            error={errors.comment}
          />
          <Button type="submit" className="bg-primary-500 my-2 text-white" isLoading={isSubmitting}>
            Add a Review
          </Button>
        </form>
      )}
      <div className="my-2 space-y-2">
        {reviews.map(({ _id, name, comment, rating, user: ratedUser }) => (
          <div key={_id} className="rounded-xl py-4">
            <div className="text-lg font-semibold">
              {name}{' '}
              {user?._id === ratedUser && (
                <sub className="rounded-xl bg-blue-400 p-1 text-xs text-white">You</sub>
              )}
              <span className="text-primary-600 ml-2 border-l-2 border-slate-500 pl-2 text-sm font-medium">
                Verified Purchase
              </span>
            </div>
            <Stars ratings={rating} className="my-2 h-4 w-4" />
            <blockquote className="text-base italic">{comment}</blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
