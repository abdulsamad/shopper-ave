import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

const bannerImages = [
  {
    src: 'https://source.unsplash.com/random/1920x1080',
  },
  {
    src: 'https://source.unsplash.com/random/1921x1081',
  },
  {
    src: 'https://source.unsplash.com/random/1922x1082',
  },
];

const Index = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoPlay()]);

  return (
    <section className="embla h-[500px] w-full overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex h-full">
        {bannerImages.map(({ src }) => (
          <div key={src} className="embla__slide shrink-0 grow-0 basis-full">
            <div className="flex h-full items-center justify-center">
              <Image
                height={500}
                width={1920}
                src={src}
                className="w-full object-cover"
                alt="Banner"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Index;
