import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

const bannerImages = [
  {
    src: 'https://source.unsplash.com/random/1080x502',
  },
  {
    src: 'https://source.unsplash.com/random/1080x500',
  },
  {
    src: 'https://source.unsplash.com/random/1080x500',
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
              <Image src={src} className="object-cover" alt="Banner" fill priority />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
