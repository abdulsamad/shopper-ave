import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

import { Product } from 'shared-types';

interface IPhotos {
  photos: Product['photos'];
  name: string;
}

const Photos = ({ photos, name }: IPhotos) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      if (emblaThumbsApi.clickAllowed()) emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla w-full">
      <div className="embla__viewport overflow-hidden" ref={emblaMainRef}>
        <div className="embla__container flex h-[300px] items-center justify-center">
          {photos.map(({ id, secure_url }) => (
            <div key={id} className="embla__slide">
              <Image src={secure_url} alt={name} className="object-contain" fill />
            </div>
          ))}
        </div>
      </div>
      {photos.length > 1 && (
        <div className="embla-thumbs mt-14">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container flex gap-3 overflow-auto">
              {photos.map(({ id, secure_url }, index) => (
                <button
                  key={id}
                  className={`relative ${selectedIndex === index ? 'opacity-100' : 'opacity-20'}`}
                  onClick={() => onThumbClick(index)}>
                  <div className="embla-thumbs__slide__number border-primary absolute top-2.5 left-1.5 rounded-full border border-solid bg-gray-700 px-2 py-1 text-[0.6rem] text-white">
                    <span>{index + 1}</span>
                  </div>
                  <Image
                    src={secure_url}
                    alt={name}
                    className="object-contain"
                    height={80}
                    width={120}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
