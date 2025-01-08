import React, { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: ReactNode; // or image, i'll figure it out whats best
}

const InfoCard = ({ title, description, icon }: InfoCardProps) => {
  return (
    <div className='flex flex-col border-2 border-[#FFF1EE] bg-[#131111] p-8'>
      <div className='mx-auto mb-8 h-48 w-48'>{icon}</div>
      <h3 className='text-center font-advercase text-3xl text-[#FFF1EE] md:text-4xl'>{title}</h3>
      <p className='md:text-md mt-4 font-montserrat text-xs text-[#D3C4C1] lg:text-lg'>
        {description}
      </p>
    </div>
  );
};

export default InfoCard;
