import React from 'react';

import InfoCard from '@/app/components/InfoCard';

const HowItWorksSection = () => {
  return (
    <section id='how-it-works' className='relative py-2 md:px-4 md:py-2'>
      <div className='mx-auto mt-20 max-w-[97%] md:max-w-[90%]'>
        <h2 className='text-center font-advercase text-6xl text-[#FFEFEB] sm:text-6xl md:text-left md:text-7xl lg:text-8xl'>
          How Does <br className='md:hidden' /> It Work?
        </h2>

        <div className='mx-auto mt-12 grid grid-cols-1 gap-y-3 md:mt-16 md:grid-cols-2 lg:gap-6 xl:grid-cols-3'>
          <InfoCard
            imageSrc='/images/trust-minimized.png'
            title='Trust Minimized'
            description='User applications embed a light node that downloads and verifies this proof directly from the Celestia network, without any intermediaries or RPCs - your app is a node in the network.'
          />
          <InfoCard
            imageSrc='/images/direct_verification.png'
            title='Direct Verification'
            description='To eliminate the need for centralized key directories, Prism cryptographically verifies the identity behind every interaction by pairing validity proofs of the key directory and the corresponding roots to a high-throughput, shared data layer as the first based rollup on Celestia.'
          />
          <div className='md:col-span-2 xl:col-span-1'>
            <InfoCard
              imageSrc='/images/unstoppable_PKI.png'
              title='Unstoppable PKI'
              description='Prism enables a new generation of applications built on verifiable public key infrastructure. Developers can now create systems where users directly verify cryptographic materials without trusting central authorities. Build authentication that just works—backed by cryptographic proofs, not promises.'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
