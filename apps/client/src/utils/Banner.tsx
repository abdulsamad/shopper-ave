import React from 'react';
import Image from 'next/image';

interface IBanner {
  children: React.ReactNode;
  src: string;
  alt: string;
  slideClasses: string;
  textClasses?: string;
  imgClasses?: string;
  imgFilter?: string;
}

const Banner = ({
  children,
  src,
  alt,
  slideClasses,
  textClasses = 'top-1/2 right-10',
  imgClasses = 'left-0',
  imgFilter,
}: IBanner) => {
  return (
    <div className={`relative h-full shrink-0 grow-0 basis-full ${slideClasses}`}>
      <div className="container relative mx-auto flex h-full items-center">
        <div className={`absolute z-10 max-w-[550px] text-center  ${textClasses}`}>{children}</div>
        <Image
          src={src}
          className={`absolute object-contain ${imgClasses}`}
          style={{ filter: imgFilter }}
          alt={alt}
          height={800}
          width={800}
          priority
        />
      </div>
    </div>
  );
};

export default Banner;
