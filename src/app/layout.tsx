import { Metadata, Viewport } from 'next';
import { EB_Garamond, Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import * as React from 'react';

import '@/styles/globals.css';

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-96x96.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport: Viewport = {
  themeColor: '#131111',
};

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const advercase = localFont({
  src: '../../public/fonts/AdvercaseFont-Regular.woff2',
  display: 'swap',
  variable: '--font-advercase',
  declarations: [
    {
      prop: 'line-height',
      value: '1.1',
    },
  ],
});

const advercaseBold = localFont({
  src: '../../public/fonts/AdvercaseFont-Bold.woff2',
  display: 'swap',
  variable: '--font-advercase-bold',
  declarations: [
    {
      prop: 'line-height',
      value: '1.1',
    },
  ],
});

const BerkeleyMono = localFont({
  src: '../../public/fonts/BerkeleyMono-Regular.woff2',
  display: 'swap',
  variable: '--font-berkeley-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${garamond.variable} ${advercase.variable} ${advercaseBold.variable} ${montserrat.variable} ${BerkeleyMono.variable}`}
    >
      <body>
        <div className='' />
        {children}
        <svg width='0' height='0'>
          <filter id='noise'>
            <feTurbulence
              type='fractalNoise'
              baseFrequency='0.6'
              numOctaves='3'
              stitchTiles='stitch'
              result='noise'
            />
            <feColorMatrix type='saturate' values='0' in='noise' result='desaturatedNoise' />
            <feComponentTransfer in='desaturatedNoise' result='finalNoise'>
              <feFuncA type='table' tableValues='0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1' />
            </feComponentTransfer>
          </filter>
        </svg>
      </body>
    </html>
  );
}
