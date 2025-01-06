import Arrow from 'public/svg/arrow.svg';
import React from 'react';

export default function PrismGuideButton() {
  return (
    <button className='group flex h-10 w-full max-w-[200px] items-center justify-center gap-2 rounded-md border border-[#FFEFEB] bg-black px-6 font-montserrat font-semibold text-[#FFEFEB] hover:bg-[#FFEFEB] hover:text-black md:h-12 md:max-w-[210px]'>
      <Arrow className='h-3 w-3 md:h-4 md:w-4 group-hover:[&>path]:fill-black' />
      Prism Guide
    </button>
  );
}
