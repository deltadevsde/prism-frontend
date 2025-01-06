import React from 'react';

import InfoCard from '@/app/components/InfoCard';

const HowItWorksSection = () => {
  return (
    <section className='relative bg-black px-4 py-2 md:py-2'>
      <div className='mx-auto max-w-[97%] md:max-w-[90%]'>
        <h2 className='font-advercase text-5xl text-[#FFEFEB] md:text-7xl lg:text-8xl'>
          How Does It Work?
        </h2>

        <div className='mt-12 grid gap-6 md:mt-16 md:grid-cols-3'>
          <InfoCard
            title='Trust Minimized'
            description='User applications embed a light node that downloads and verifies this proof directly from the Celestia network, without any intermediaries or RPCs - your app is a node in the network.'
          />
          <InfoCard
            title='Direct Verification'
            description='To eliminate the need for centralized key directories, Prism cryptographically verifies the identity behind every interaction by pairing validity proofs of the key directory and the corresponding roots to a high-throughput, shared data layer as the first based rollup on Celestia.'
          />
          <InfoCard
            title='Unstoppable PKI'
            description='Prism enables a new generation of applications built on verifiable public key infrastructure. Developers can now create systems where users directly verify cryptographic materials without trusting central authorities. Build authentication that just works—backed by cryptographic proofs, not promises.'
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
