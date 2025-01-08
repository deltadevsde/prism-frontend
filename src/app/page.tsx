'use client';

import * as React from 'react';
import '@/lib/env';

import AnimatedHeader from '@/app/components/AnimatedHeader';
import ContentSection from '@/app/components/ContentSections';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
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
      <Header />
      <AnimatedHeader />
      <ContentSection />
      <Footer />
    </main>
  );
}
