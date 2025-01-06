import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import RunLightNodeButton from '@/app/components/RunLightNodeButton';

const Footer = () => {
  return (
    <footer className='relative bg-black'>
      <div className='relative mx-auto -mb-12 max-w-[85%] overflow-hidden border-2'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#D53315] to-[#9747FF]' />

        <div className='relative flex flex-col items-center justify-between gap-6 px-8 py-8 md:flex-row md:px-12'>
          <h2 className='font-advercase text-4xl text-[#FFEFEB] md:text-5xl'>
            Start Prism Light Node Now
          </h2>

          <RunLightNodeButton transparent={true} />
        </div>
      </div>
      <div className='mx-auto max-w-[95%] border-2 border-b-0 border-white pt-16 md:max-w-[90%]'>
        <div className='mx-auto max-w-[95%] px-4 pb-8'>
          <div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
            <div className='flex flex-wrap gap-8'>
              <a
                href='#'
                className='flex items-center gap-2 font-montserrat text-sm text-[#9C9C9C] transition-colors hover:text-white'
              >
                <ArrowUpRight className='h-4 w-4' />
                Documentation
              </a>
              <a
                href='#'
                className='flex items-center gap-2 font-montserrat text-sm text-[#9C9C9C] transition-colors hover:text-white'
              >
                <ArrowUpRight className='h-4 w-4' />
                Resources
              </a>
              <a
                href='#'
                className='flex items-center gap-2 font-montserrat text-sm text-[#9C9C9C] transition-colors hover:text-white'
              >
                <ArrowUpRight className='h-4 w-4' />
                Prism Quickstart
              </a>
            </div>

            <div className='flex gap-4'>
              <a
                href='#'
                className='rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20'
              >
                <Image src='/social/twitch.svg' alt='Twitch' width={24} height={24} />
              </a>
              <a
                href='#'
                className='rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20'
              >
                <Image src='/social/youtube.svg' alt='YouTube' width={24} height={24} />
              </a>
              <a
                href='#'
                className='rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20'
              >
                <Image src='/social/twitter.svg' alt='Twitter' width={24} height={24} />
              </a>
              <a
                href='#'
                className='rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20'
              >
                <Image src='/social/discord.svg' alt='Discord' width={24} height={24} />
              </a>
              <a
                href='#'
                className='rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20'
              >
                <Image src='/social/github.svg' alt='GitHub' width={24} height={24} />
              </a>
            </div>
          </div>

          <div className='mt-12 text-center font-montserrat text-sm text-white'>
            © 2024 | Prism Inc. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
