import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import Button from '@utils/Button';
import Banner from '@utils/Banner';

const bannerImages = [
  {
    src: 'https://res.cloudinary.com/abdulsamad/image/upload/v1670939764/shopping_xgna10.webp',
    slideClasses: 'bg-[linear-gradient(45deg,#8e54e9,#4776e6)] text-white',
    textClasses: 'top-1/2 -translate-y-1/2 left-5',
    imgClasses: '-right-16 bottom-0',
    imgFilter: 'drop-shadow(0.5rem 1rem 2rem #fdfdfd)',
    children: (
      <div className="text-white">
        <h1 className="font-serif text-2xl font-semibold uppercase italic lg:text-3xl">
          The <span className="text-primary">Festive Season</span> is here
        </h1>
        <p className="my-2 text-sm lg:text-lg">
          Upto <span className="text-xl font-semibold italic">30% off</span> on all items ordered
          before the end of this month.
        </p>
        <p className="my-1 text-xs italic">* T&C Apply</p>
        <Button className="bg-primary mt-2 inline-flex text-white">
          <ShoppingCartIcon className="mr-2 h-6 w-6" />
          Shop Now
        </Button>
      </div>
    ),
  },
  {
    src: 'https://res.cloudinary.com/abdulsamad/image/upload/v1670939761/jacket_inlgnr.webp',
    slideClasses: 'bg-[radial-gradient(circle,#d64a40,#f44336)]',
    textClasses: 'top-1/2 -translate-y-1/2 right-5',
    imgClasses: 'left-0 bottom-0',
    imgFilter: 'drop-shadow(0.5rem 1rem 2rem #2f2f2f)',
    children: (
      <div className="text-white">
        <h1 className="font-serif text-2xl font-semibold uppercase italic lg:text-3xl">
          Fashion as unique as you are
        </h1>
        <p className="my-2 text-sm lg:text-lg">
          Checkout our latest collection and get upto{' '}
          <span className="font-semibold italic">30% Off</span> on all items ordered before the end
          of this month.
        </p>
        <p className="my-1">Casual | Formal | Ethnic</p>
        <Button className="bg-primary text- mt-2 inline-flex">
          <ShoppingCartIcon className="mr-2 h-6 w-6" />
          Shop Now
        </Button>
      </div>
    ),
  },
];

const Index = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoPlay()]);

  return (
    <div className="embla lg:[250px] h-[500px] w-full overflow-hidden lg:h-[500px]" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {bannerImages.map(({ src, slideClasses, children, textClasses, imgClasses, imgFilter }) => (
          <Banner
            key={src}
            src={src}
            alt="Banner"
            textClasses={textClasses}
            imgClasses={imgClasses}
            imgFilter={imgFilter}
            slideClasses={`embla__slide ${slideClasses}`}>
            {children}
          </Banner>
        ))}
      </div>
    </div>
  );
};

export default Index;
