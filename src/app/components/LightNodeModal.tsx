import Spline from '@splinetool/react-spline';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// TODO: We need to wait for spline to be loaded, otherwise we should show a loading spinner or something similar
// TODO: START LOADING SPLINE WHILE THE ANIMATION IS RUNNING

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const LoadingDots = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (dots === '...') {
      interval = setTimeout(() => {
        setDots('');
      }, 500);
    } else {
      interval = setTimeout(() => {
        setDots((prev) => prev + '.');
      }, 400);
    }

    return () => clearTimeout(interval);
  }, [dots]);

  return <span className='ml-1 min-w-[24px] font-advercase'>{dots}</span>;
};

const LightNodeModal = ({ isOpen, onClose }: ModalProps) => {
  const [progress] = useState(72);
  const [modalPosition, setModalPosition] = useState(0);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight / 2;
      setModalPosition(viewportCenter);
      document.body.style.overflow = 'hidden';

      const wasLoaded = sessionStorage.getItem('splineLoaded');
      setIsSplineLoaded(wasLoaded === 'true');
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className='fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm'
        onClick={() => window.location.reload()}
      />

      <div
        className='fixed left-1/2 z-[101] w-[90%] md:max-w-[1000px]'
        style={{
          top: `${modalPosition}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className='border-2 border-white bg-[#131111]'>
          <div className='flex items-center justify-between p-6 pb-3'>
            <h2 className='font-advercase text-2xl text-white md:text-4xl'>
              Running Light Node
              <LoadingDots />
            </h2>
            <button
              onClick={() => window.location.reload()}
              className='border border-white/90 text-white/90 transition-colors hover:border-white hover:text-white'
            >
              <X className='h-5 w-5 md:h-7 md:w-7' />
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='order-2 md:order-1'>
              <div className='space-y-6 px-6 pb-1 pt-6 md:p-6'>
                <div className='md:space-y-2'>
                  <div className='font-advercase text-lg text-white'>Progress</div>
                  <div className='text-md text-center font-advercase text-white md:text-lg'>
                    {progress}%
                  </div>

                  <div className='h-2 overflow-hidden bg-[#723ECF] md:h-4'>
                    <div
                      className='h-full bg-white transition-all duration-300'
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='font-advercase text-lg text-white'>Event Logs</div>
                  <div className='md:text-md h-48 overflow-auto font-berkeley-mono text-sm text-[#FFEFEB] md:h-64'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                </div>
              </div>
            </div>
            <div className='relative order-1 h-48 md:order-2 md:h-96'>
              <div className='absolute inset-0 flex items-center justify-center'>
                {!isSplineLoaded && (
                  <div className='flex items-center justify-center'>
                    <div className='text-white'>
                      Loading 3D Model
                      <LoadingDots />
                    </div>
                  </div>
                )}
                <div className='origin-center scale-[0.2] md:scale-[0.35]'>
                  <Spline
                    style={{ height: 1000, width: 1000 }}
                    scene='https://prod.spline.design/V30jxm7Rt3T1ZpnJ/scene.splinecode'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LightNodeModal;
