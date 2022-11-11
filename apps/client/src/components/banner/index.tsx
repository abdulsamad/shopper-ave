import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const Index = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <section className="embla h-full overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex h-full">
        <div className="embla__slide shrink-0 grow-0 basis-full">
          <div className="flex h-full items-center justify-center">
            <img src="https://source.unsplash.com/random/1920x1080" alt="" />
          </div>
        </div>
        <div className="embla__slide shrink-0 grow-0 basis-full">
          <div className="flex h-full items-center justify-center">
            <img src="https://source.unsplash.com/random/1920x1080" alt="" />
          </div>
        </div>
        <div className="embla__slide shrink-0 grow-0 basis-full">
          <div className="flex h-full items-center justify-center">
            <img src="https://source.unsplash.com/random/1920x1080" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
