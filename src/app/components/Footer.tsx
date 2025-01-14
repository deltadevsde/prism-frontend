import Image from 'next/image';
import Discord from 'public/images/discord.png';
import Github from 'public/images/github.png';
import Twitch from 'public/images/twitch.png';
import X from 'public/images/x.png';
import YouTube from 'public/images/youtube.png';
import Arrow from 'public/svg/arrow.svg';
import React from 'react';

import RunLightNodeButton from '@/app/components/RunLightNodeButton';

interface FooterProps {
  openModal: () => void;
}

const Footer = ({ openModal }: FooterProps) => {
  return (
    <footer className='relative'>
      <div className='relative mx-auto -mb-10 max-w-[85%]'>
        <div className='absolute -bottom-1.5 -right-1.5 left-1.5 top-2.5 bg-white' />
        <div className='relative overflow-hidden border-2 border-white'>
          <div className='absolute inset-0 bg-gradient-to-r from-[#D53315] to-[#9747FF]' />

          <div className='relative flex flex-col items-center justify-between gap-6 px-8 py-6 md:flex-row md:px-12 md:py-4'>
            <h2 className='text-center font-advercase text-3xl text-[#FFEFEB] md:text-left md:text-2xl lg:text-4xl'>
              Start Prism Light Node Now
            </h2>

            <RunLightNodeButton
              transparent
              keepTextWhite
              onClick={openModal}
              className='max-w-[320px] border-2 hover:bg-[#723ECF] md:h-16 lg:max-w-[440px]'
            />
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-[95%] border-2 border-b-0 border-white bg-black pt-16 md:max-w-[90%]'>
        <div className='mx-auto max-w-[95%] px-4 pb-8'>
          <div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
            <div className='flex flex-col items-center gap-8 md:flex-row'>
              <a
                href='https://prism.deltadevs.xyz/'
                className='group flex items-center gap-2 font-montserrat text-sm font-semibold text-[#9C9C9C] transition-colors hover:text-white'
              >
                <Arrow className='h-2 w-2 [&>path]:fill-[#9C9C9C] group-hover:[&>path]:fill-white' />
                Documentation
              </a>
              <a
                href='https://prism.deltadevs.xyz/'
                className='group flex items-center gap-2 font-montserrat text-sm font-semibold text-[#9C9C9C] transition-colors hover:text-white'
              >
                <Arrow className='h-2 w-2 [&>path]:fill-[#9C9C9C] group-hover:[&>path]:fill-white' />
                Resources
              </a>
              <a
                href='https://prism.deltadevs.xyz/quickstart.html'
                className='group flex items-center gap-2 font-montserrat text-sm font-semibold text-[#9C9C9C] transition-colors hover:text-white'
              >
                <Arrow className='h-2 w-2 [&>path]:fill-[#9C9C9C] group-hover:[&>path]:fill-white' />
                Prism Quickstart
              </a>
            </div>

            <div className='flex gap-4'>
              <div className='rounded-full bg-[#723ECF]'>
                <a
                  href='http://twitch.tv/distractedm1nd'
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all hover:-translate-x-1 hover:-translate-y-1'
                >
                  <Image src={Twitch} alt='Twitch' width={20} height={20} />
                </a>
              </div>
              <div className='rounded-full bg-[#723ECF]'>
                <a
                  href='https://www.youtube.com/@prismxyz'
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all hover:-translate-x-1 hover:-translate-y-1'
                >
                  <Image src={YouTube} alt='YouTube' width={22} height={22} />
                </a>
              </div>
              <div className='rounded-full bg-[#723ECF]'>
                <a
                  href='https://www.x.com/prism_xyz'
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all hover:-translate-x-1 hover:-translate-y-1'
                >
                  <Image src={X} alt='X' width={20} height={20} />
                </a>
              </div>
              <div className='rounded-full bg-[#723ECF]'>
                <a
                  href='https://discord.gg/kSbT5z8N'
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all hover:-translate-x-1 hover:-translate-y-1'
                >
                  <Image src={Discord} alt='Discord' width={22} height={22} />
                </a>
              </div>
              <div className='rounded-full bg-[#723ECF]'>
                <a
                  href='https://www.github.com/deltadevsde/prism'
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-black transition-all hover:-translate-x-1 hover:-translate-y-1'
                >
                  <Image src={Github} alt='GitHub' width={40} height={40} />
                </a>
              </div>
            </div>
          </div>

          <div className='mt-12 text-center font-montserrat text-sm text-white'>
            © 2025 | Prism Inc. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
