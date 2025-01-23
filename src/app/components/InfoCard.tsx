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
      <div className='mx-auto mb-8 flex h-60 w-60 items-center'>
        {imageSrc && (
          <div className='relative mx-auto h-60 w-60'>
            <Image
              src={imageSrc}
              alt={`${title} icon`}
              className='object-contain'
              sizes='10vw'
              fill
              loading='lazy'
            />
          </div>
        )}
      </div>
      <h3 className='text-center font-advercase text-3xl text-[#FFF1EE] md:text-4xl'>{title}</h3>
      <p className='md:text-md mt-4 font-montserrat text-xs text-[#D3C4C1] lg:text-lg'>
        {description}
      </p>
    </div>
  );
};

export default InfoCard;
