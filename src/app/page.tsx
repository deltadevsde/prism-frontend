'use client';

import * as React from 'react';
import { useState } from 'react';
import '@/lib/env';

import AnimatedHeader from '@/app/components/AnimatedHeader';
import ContentSection from '@/app/components/ContentSections';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import LightNodeModal from '@/app/components/LightNodeModal';

const isFirefox = (): boolean => {
  if (typeof window === 'undefined') return false;
  return navigator.userAgent.toLowerCase().includes('firefox');
};

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (isFirefox()) {
      alert('Firefox is not supported for running the Light Node.');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <main
      className='relative'
      style={{
        backgroundImage:
          'radial-gradient(100% 51% at 100% 100%, #6F29CA 13%, #F13F3A 45%, #8C2825 65%, #461816 75%, #131111 85%, #131111 100%)',
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '80% 40%',
        backgroundColor: '#131111',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
      }}
    >
      <LightNodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header openModal={openModal} />
      <AnimatedHeader openModal={openModal} />
      <ContentSection />
      <Footer openModal={openModal} />
    </main>
  );
}
