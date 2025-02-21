import Image from 'next/image';
import React from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  imageSrc?: string;
}

const InfoCard = ({ title, description, imageSrc }: InfoCardProps) => {
  return (
    <div className='flex flex-col border-2 border-[#FFF1EE] bg-[#131111] p-8'>
      <div className='mx-auto mb-8 flex h-60 w-60 items-center lg:h-80 lg:w-80'>
        {imageSrc && (
          <div className='relative mx-auto h-60 w-60 lg:h-80 lg:w-80'>
            <Image
              src={imageSrc}
              alt={`${title} icon`}
              className='object-contain'
              sizes='20vw'
              fill
              loading='lazy'
            />
          </div>
        )}
      </div>
      <h3 className='text-center font-advercase text-3xl text-[#FFF1EE] md:text-4xl'>{title}</h3>
      <p className='md:text-md mt-4 text-justify font-montserrat text-xs text-[#D3C4C1] lg:text-lg'>
        {description}
      </p>
    </div>
  );
};

export default InfoCard;
