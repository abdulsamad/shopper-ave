import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

interface IStar {
  ratings: number;
  className?: string;
}

const Stars = ({ ratings, className }: IStar) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) =>
        star <= ratings ? (
          <StarIcon key={star} className={`text-yellow-500 ${className}`} />
        ) : (
          <StarIconOutline key={star} className={className} />
        )
      )}
    </div>
  );
};

export default Stars;
