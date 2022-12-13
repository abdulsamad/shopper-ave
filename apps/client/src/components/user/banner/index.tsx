import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

const bannerImages = [
  {
    src: 'https://res.cloudinary.com/abdulsamad/image/upload/v1666595994/products/dlr157h1tx8pfbm97gug.jpg',
  },
  {
    src: 'https://res.cloudinary.com/abdulsamad/image/upload/v1670931462/products/pf1rlaxbezpy1ntygwfo.jpg',
  },
  {
    src: 'https://res.cloudinary.com/abdulsamad/image/upload/v1666515085/products/muxx1yzmsbeyhysxzzyh.jpg',
  },
];

const Index = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoPlay()]);

  return (
    <div className="embla h-[250px] w-full overflow-hidden lg:h-[500px]" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {bannerImages.map(({ src }) => (
          <div key={src} className="embla__slide shrink-0 grow-0 basis-full">
            <div className="flex h-full items-center justify-center">
              <Image
                src={src}
                className="object-cover"
                alt="Banner"
                height={500}
                width={1920}
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
