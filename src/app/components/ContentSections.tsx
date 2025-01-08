import React from 'react';

import HowItWorksSection from '@/app/components/HowDoesItWork';
import PrismGuideButton from '@/app/components/PrismGuideButton';
import WhyPrismSection from '@/app/components/WhyPrismSection';

const ContentSection = () => {
  return (
    <section className='min-h-screen px-4 py-16 md:py-24'>
      <div className='mx-auto max-w-[97%] md:max-w-[90%]'>
        <h1 className='mb-4 text-center font-advercase text-3xl text-white md:mb-12 md:text-left md:text-6xl lg:text-7xl'>
          <span className='block'>Making the internet</span>
          <span className='block md:leading-[1.6]'>verifiable, not just secure.</span>
        </h1>

        <PrismGuideButton />
      </div>
      <WhyPrismSection />
      <HowItWorksSection />
    </section>
  );
};

export default ContentSection;
