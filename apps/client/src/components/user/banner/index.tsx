import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

const bannerImages = [
  {
    src: 'https://res.cloudinary.com/abdulsamad/image/upload/v1670939764/shopping_xgna10.webp',
    text: (
      <h1 className="absolute top-1/2 left-5 bg-amber-200 text-center text-3xl">
        The <span>Festive Season</span> is HERE.
      </h1>
    ),
  },
  {
    src: 'https://res.cloudinary.com/abdulsamad/image/upload/v1670939761/jacket_inlgnr.webp',
    text: (
      <h1 className="absolute top-1/2 left-5 bg-amber-200 text-center text-3xl uppercase">
        Fashion as unique as you are
      </h1>
    ),
  },
];

const Index = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoPlay()]);

  return (
    <div className="embla h-[250px] w-full overflow-hidden lg:h-[500px]" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {bannerImages.map(({ src, text }) => (
          <div key={src} className="embla__slide relative h-full shrink-0 grow-0 basis-full">
            <div className="flex h-full items-center justify-center">
              {text}
              <Image
                src={src}
                className="object-contain"
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
