import Link from 'next/link';
import Arrow from 'public/svg/arrow.svg';
import PrismLogo from 'public/svg/prism-logo.svg';
import React, { useEffect, useState } from 'react';

import RunLightNodeButton from '@/app/components/RunLightNodeButton';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 100;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b-2 border-white backdrop-blur-sm transition-all duration-300 ${
        isVisible ? 'mt-0 translate-y-0 opacity-100' : 'fixed -mt-20 opacity-0'
      }`}
      style={{
        background:
          'linear-gradient(170deg, rgba(89,22,176,0.5) 0%, rgba(133,34,142,0.5) 18%, rgba(50,17,42,0.5) 50%, rgba(24,12,11,0.5) 61%)',
      }}
    >
      <div className='mx-auto flex h-16 items-center justify-between px-4 xl:px-12'>
        <Link href='/' className='flex items-center gap-2'>
          <PrismLogo className='h-8 w-8' />
          <span className='font-garamond text-2xl text-white'>prism</span>
        </Link>

        <nav className='none hidden items-center gap-12 md:flex'>
          <Link
            href='/why-prism'
            className='group flex shrink-0 items-center gap-1 whitespace-nowrap font-montserrat text-sm text-[#9C9C9C] hover:text-white'
          >
            <Arrow className='mr-1 h-2 w-2 [&>path]:fill-[#9C9C9C] group-hover:[&>path]:fill-white' />
            Why Prism?
          </Link>

          <Link
            href='/how-it-works'
            className='group flex shrink-0 items-center gap-1 whitespace-nowrap font-montserrat text-sm text-[#9C9C9C] hover:text-white'
          >
            <Arrow className='mr-1 h-2 w-2 [&>path]:fill-[#9C9C9C] group-hover:[&>path]:fill-white' />
            How Does It Work?
          </Link>

          <RunLightNodeButton className='button-hover hover-white relative h-10 shrink-0' />
        </nav>
      </div>
    </header>
  );
};

export default Header;
