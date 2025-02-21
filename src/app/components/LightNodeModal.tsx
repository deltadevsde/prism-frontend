import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

import { LogEntry, useLightClient } from '@/lib/use-light-client';

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
      interval = setTimeout(() => setDots(''), 500);
    } else {
      interval = setTimeout(() => setDots((prev) => prev + '.'), 400);
    }
    return () => clearTimeout(interval);
  }, [dots]);

  return <span className='ml-1 min-w-[24px] font-advercase'>{dots}</span>;
};

const LogItem = ({ log }: { log: LogEntry }) => {
  // Format: [timestamp] TYPE - message
  const typeLabel = log.type.toUpperCase();
  return (
    <div className='mb-1 text-white'>
      [{log.timestamp}] {typeLabel} - {log.message}
    </div>
  );
};

const LogContainer = ({ logs }: { logs: LogEntry[] }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className='space-y-2'>
      <div className='font-advercase text-lg text-white'>Event Logs</div>
      <div
        ref={logContainerRef}
        className='log-container md:text-md scrollbar-thin scrollbar-track-[#131111] scrollbar-thumb-[#723ECF] h-48 overflow-auto font-berkeley-mono text-sm text-[#FFEFEB] md:h-64'
      >
        {logs.map((log, index) => (
          <LogItem key={index} log={log} />
        ))}
      </div>
    </div>
  );
};

const SplineContainer = React.memo(() => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Spline
      style={{ height: 1000, width: 1000 }}
      scene='https://prod.spline.design/V30jxm7Rt3T1ZpnJ/scene.splinecode'
    />
  </React.Suspense>
));

const MainLightNodeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [modalPosition, setModalPosition] = useState(0);
  const hasStartedRef = useRef(false);

  const {
    isRunning,
    logs,
    progress,
    currentHeight,
    targetHeight,
    startLightClient,
    stopLightClient,
  } = useLightClient();

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight / 2;
      setModalPosition(viewportCenter);
      document.body.style.overflow = 'hidden';

      if (!isRunning && !hasStartedRef.current) {
        startLightClient();
        hasStartedRef.current = true;
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (isRunning && !isOpen) {
        stopLightClient();
        hasStartedRef.current = false;
      }
    };
  }, [isOpen, isRunning, startLightClient, stopLightClient]);

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

  return (
    <>
      <div
        className='fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm'
        onClick={() => {
          window.location.reload();
          onClose();
        }}
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
              {isRunning ? 'Running Light Node' : 'Starting Light Node'}
              <LoadingDots />
            </h2>
            <button
              onClick={() => {
                window.location.reload();
                onClose();
              }}
              className='border border-white/90 text-white/90 transition-colors hover:border-white hover:text-white'
            >
              <X className='h-5 w-5 md:h-7 md:w-7' />
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='order-2 md:order-1'>
              <div className='space-y-6 px-6 pb-1 pt-6 md:p-6'>
                <div className='md:space-y-2'>
                  <div className='flex flex-row items-center justify-between'>
                    <div className='font-advercase text-lg text-white'>Progress</div>
                    {currentHeight > 0 && (
                      <div className='flex flex-row gap-1 font-advercase text-xs text-white'>
                        <div>Current Height: {currentHeight}</div>
                        {targetHeight > 0 && <div>/ Target: {targetHeight}</div>}
                      </div>
                    )}
                  </div>
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

                {/* Commitment button removed */}
                <LogContainer logs={logs} />
              </div>
            </div>
            <div className='relative order-1 h-48 md:order-2 md:h-96'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='origin-center scale-[0.2] md:scale-[0.35]'>
                  {isOpen && <SplineContainer />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LightNodeModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return <MainLightNodeModal isOpen onClose={onClose} />;
};

export default LightNodeModal;
