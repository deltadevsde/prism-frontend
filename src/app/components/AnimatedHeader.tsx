import React, { useEffect, useState } from 'react';

import PrismGuideButton from '@/app/components/PrismGuideButton';
import RunLightNodeButton from '@/app/components/RunLightNodeButton';
import SplinePreloader from '@/app/components/SplinePreloader';

interface AnimatedHeaderProps {
  openModal: () => void;
}

const AnimatedHeader = ({ openModal }: AnimatedHeaderProps) => {
  const [animationState, setAnimationState] = useState('initial');
  const [lineState, setLineState] = useState('initial');
  const [isSplinePreloaded, setIsSplinePreloaded] = useState(false);

  useEffect(() => {
    const wasLoaded = sessionStorage.getItem('splineLoaded');
    setIsSplinePreloaded(wasLoaded === 'true');

    const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');

    const sequence = async () => {
      if (hasSeenAnimation === 'true') {
        setAnimationState('verifyIn');
        return;
      }

      await new Promise((r) => setTimeout(r, 300));
      setAnimationState('prismIn');
      await new Promise((r) => setTimeout(r, 1000));
      setAnimationState('underlineIn');
      setLineState('visible');
      await new Promise((r) => setTimeout(r, 1000));
      setLineState('exit');
      await new Promise((r) => setTimeout(r, 100));
      setAnimationState('prismOut');
      await new Promise((r) => setTimeout(r, 1000));
      setAnimationState('trustIn');
      await new Promise((r) => setTimeout(r, 800));
      setAnimationState('trustStrike');
      await new Promise((r) => setTimeout(r, 500));
      setAnimationState('verifyIn');

      sessionStorage.setItem('hasSeenAnimation', 'true');
    };

    sequence();
  }, []);

  const getTranslateX = () => {
    switch (lineState) {
      case 'initial':
        return '-101%';
      case 'visible':
        return '0%';
      case 'exit':
        return '101%';
      default:
        return '-100%';
    }
  };

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {!isSplinePreloaded && <SplinePreloader />}
      <div className='grain-overlay' />
      <div className='absolute inset-0 bg-[#131111]'>
        <div className="absolute inset-0 bg-[url('/images/gradient1.png')] bg-cover bg-[25%_center] md:bg-center" />
      </div>
      <div className='animate-gradient-shift absolute inset-0 mix-blend-overlay'>
        <div className='absolute inset-0 bg-gradient-to-r from-purple-700 via-red-500 to-blue-600 opacity-70 blur-3xl' />
        <div className='animate-gradient-shift-reverse absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-700 to-red-500 opacity-70 blur-3xl' />
      </div>

      <div className='relative z-10 flex h-full flex-col items-center justify-center'>
        <div className='absolute'>
          <div
            className={`relative font-garamond text-8xl text-[#FFEFEB] transition-all duration-700 ease-in-out md:text-9xl lg:text-[12vw] ${animationState === 'initial' ? 'translate-y-full opacity-0' : ''} ${animationState === 'prismIn' || animationState === 'underlineIn' ? 'translate-y-0 opacity-100' : ''} ${animationState === 'prismOut' ? '-translate-y-full opacity-0' : ''} ${animationState === 'trustIn' || animationState === 'trustStrike' || animationState === 'verifyIn' ? 'hidden' : ''} `}
          >
            prism
          </div>
          <div className='relative' style={{ width: '100%', marginLeft: '12%' }}>
            <div className='overflow-hidden' style={{ width: '88%' }}>
              <div
                className={`h-1 bg-[#FFEFEB] transition-all duration-700 ease-in-out ${animationState === 'trustIn' || animationState === 'trustStrike' || animationState === 'verifyIn' ? 'hidden' : ''} `}
                style={{
                  width: '100%',
                  transform: `translateX(${getTranslateX()})`,
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${animationState === 'trustIn' || animationState === 'trustStrike' || animationState === 'verifyIn' ? 'opacity-100' : 'opacity-0'} `}
        >
          <div className='relative flex flex-col items-center justify-center md:gap-8'>
            <div className='flex flex-col items-center md:flex-row'>
              <div
                className={`relative font-advercase-bold text-8xl text-[#FFEFEB] transition-all duration-500 md:text-9xl lg:text-[12vw] ${
                  animationState === 'verifyIn'
                    ? '-translate-y-100 md:translate-x-0 md:translate-y-0'
                    : 'translate-y-[75%] md:translate-x-[55%] md:translate-y-0'
                }`}
              >
                <span className='opacity-50'>Trust</span>
                <div
                  className={`absolute left-0 top-[49%] z-30 h-1 bg-[#FFEFEB] transition-all duration-500 md:h-2 ${
                    animationState === 'trustStrike' || animationState === 'verifyIn'
                      ? 'w-full'
                      : 'w-0'
                  }`}
                />
              </div>

              <div
                className={`font-advercase-bold text-8xl text-[#FFEFEB] transition-all duration-500 md:text-9xl lg:text-[12vw] ${
                  animationState === 'verifyIn'
                    ? 'translate-y-4 opacity-100 md:translate-x-0 md:translate-y-0'
                    : 'pointer-events-none translate-y-full opacity-0 md:translate-x-full md:translate-y-0'
                }`}
              >
                Verify
              </div>
            </div>

            <div className='mx-auto max-w-[80%] text-center md:max-w-2xl'>
              <p
                className={`text-md mt-12 px-4 font-advercase leading-tight text-[#FFEFEB] transition-opacity duration-500 md:mt-6 md:text-xl md:leading-normal lg:text-2xl ${animationState === 'verifyIn' ? 'opacity-100' : 'opacity-0'} `}
              >
                Prism is a new verifiable authentication standard allowing users to directly verify
                the authenticity of cryptographic materials without a trusted intermediary.
              </p>

              <div
                className={`mt-8 flex flex-col items-center justify-center gap-4 transition-opacity duration-500 sm:flex-row ${
                  animationState === 'verifyIn' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <RunLightNodeButton onClick={openModal} />
                {/* <PrismGuideButton /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeader;
