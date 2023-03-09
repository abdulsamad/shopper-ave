import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import Button from '@utils/Button';

const bannerImages = [
  {
    className: 'bg-[linear-gradient(45deg,#8e54e9,#4776e6)]',
    src: 'https://res.cloudinary.com/abdulsamad/image/upload/v1670939764/shopping_xgna10.webp',
    block: (
      <div className="absolute top-1/2 left-10 z-10 -translate-y-1/2 text-center text-white lg:max-w-[400px]">
        <h1 className="font-serif text-4xl font-semibold">
          The <span className="text-primary">Festive Season</span> is HERE.
        </h1>
        <p className="text-lg">
          Upto <span className="italic">30% Off</span> on all items ordered before the end of this
          month.
          <br />
          <small className="text-small my-3 text-xs">* T&amp;C Apply</small>
        </p>
        <Button className="bg-primary mt-2 text-white">
          <ShoppingCartIcon className="mr-2 h-6 w-6" />
          Shop Now
        </Button>
      </div>
    ),
    imgClassName: 'absolute right-0',
  },
  {
    className: 'bg-[radial-gradient(circle,#d64a40,#f44336)]',
    src: 'https://res.cloudinary.com/abdulsamad/image/upload/v1670939761/jacket_inlgnr.webp',
    block: (
      <div className="absolute right-10 top-1/2 z-10 text-center text-white lg:max-w-[500px]">
        <h1 className="font-serif text-3xl font-semibold uppercase italic">
          Fashion as unique as you are
        </h1>
        <p className="text-lg">
          Checkout our latest collection and get upto{' '}
          <span className="font-semibold italic">30% Off</span> on all items ordered before the end
          of this month.
        </p>
        <p className="">Casual | Formal | Ethnic</p>
        <Button className="bg-primary mt-2 text-white">
          <ShoppingCartIcon className="mr-2 h-6 w-6" />
          Shop Now
        </Button>
      </div>
    ),
    imgClassName: 'absolute left-0',
  },
];

const Index = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoPlay()]);

  return (
    <div className="embla h-[250px] w-full overflow-hidden lg:h-[500px]" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {bannerImages.map(({ className, src, block, imgClassName }) => (
          <div
            key={src}
            className={`embla__slide relative h-full shrink-0 grow-0 basis-full ${className}`}>
            <div className="relative flex h-full items-center">
              {block}
              <Image
                src={src}
                className={`object-contain ${imgClassName}`}
                style={{ filter: 'drop-shadow(0.5rem 1rem 2rem #fdfdfd)' }}
                alt="Banner"
                height={800}
                width={800}
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
