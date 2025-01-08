import React from 'react';

import InfoCard from '@/app/components/InfoCard';

const WhyPrismSection = () => {
  return (
    <section className='relative mt-14 py-16 md:px-4 md:py-24'>
      <div
        className='absolute inset-0'
        style={{
          background: `radial-gradient(ellipse 40% 40% at 50% 50%, 
            #AC2D7E 41%, 
            #711EB9 72%, 
            transparent 100%
          )`,
          opacity: 0.8,
        }}
      />

      <div className='relative mx-auto mt-8 max-w-[97%] md:max-w-[90%]'>
        <h2 className='text-center font-advercase text-6xl text-white md:text-left md:text-7xl lg:text-8xl'>
          Why Prism?
        </h2>

        <div className='mt-12 grid gap-6 md:mt-16 md:grid-cols-2'>
          <InfoCard
            title='The Trust Problem'
            description="We browse countless websites and send encrypted messages daily, trusting we're connecting to legitimate sources. But without proper verification, malicious actors can secretly intercept your sensitive data."
          />
          <InfoCard
            title='Split-World Vulnerability'
            description='This security flaw affects billions of daily internet interactions - from basic web browsing to private messaging - making it one of the most fundamental security challenges of our digital infrastructure.'
          />
        </div>
      </div>
    </section>
  );
};

export default WhyPrismSection;
