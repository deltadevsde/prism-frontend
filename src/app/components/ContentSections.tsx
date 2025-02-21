import Image from 'next/image';
import React from 'react';

import HowItWorksSection from '@/app/components/HowDoesItWork';
import PrismGuideButton from '@/app/components/PrismGuideButton';
import WhyPrismSection from '@/app/components/WhyPrismSection';

const ContentSection = () => {
  return (
    <section className='min-h-screen px-4 py-16 lg:py-24'>
      <div className='mx-auto max-w-[97%] lg:max-w-[90%]'>
        <div className='flex flex-col items-center lg:flex-row lg:items-start lg:gap-8'>
          <div className='flex-1'>
            <h1 className='mb-4 text-center font-advercase text-3xl text-white lg:mb-12 lg:text-left lg:text-6xl'>
              <span className='block max-w-96'>Making the internet</span>
              <span className='block'>verifiable, not just secure.</span>
            </h1>
            <div className='flex justify-center lg:justify-start'>
              <PrismGuideButton />
            </div>
          </div>
          <div className='h-[500] w-[500] lg:h-[600] lg:w-[600]'>
            <Image
              src='/images/Sequence01.gif'
              alt='Gif Sequence'
              width={500}
              height={500}
              className='rounded-lg lg:h-[700px] lg:w-[700px]'
              unoptimized
            />
          </div>
        </div>
      </div>
      <WhyPrismSection />
      <HowItWorksSection />
    </section>
  );
};

export default ContentSection;
