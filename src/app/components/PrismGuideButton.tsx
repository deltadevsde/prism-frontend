import Link from 'next/link';
import Arrow from 'public/svg/arrow.svg';
import React from 'react';

export default function PrismGuideButton() {
  return (
    <Link href='https://docs.prism.rs' target='_blank'>
      <button className='group mx-auto flex h-12 w-full max-w-[190px] items-center justify-center gap-2 rounded-md border border-[#FFEFEB] bg-black px-6 font-montserrat font-semibold text-[#FFEFEB] hover:bg-[#FFEFEB] hover:text-black md:mx-0 md:max-w-[210px]'>
        <Arrow className='mr-1 h-3 w-3 group-hover:[&>path]:fill-black' />
        Documentation
      </button>
    </Link>
  );
}
