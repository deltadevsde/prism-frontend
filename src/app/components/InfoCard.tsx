import React, { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: ReactNode; // or image, i'll figure it out whats best
}

const InfoCard = ({ title, description, icon }: InfoCardProps) => {
  return (
    <div className='flex flex-col border border-white bg-black/80 p-8'>
      <div className='mx-auto mb-8 h-48 w-48'>{icon}</div>
      <h3 className='text-center font-advercase text-3xl text-[#FFEFEB] md:text-4xl'>{title}</h3>
      <p className='md:text-md mt-4 font-montserrat text-base text-[#FFEFEB]/80'>{description}</p>
    </div>
  );
};

export default InfoCard;
