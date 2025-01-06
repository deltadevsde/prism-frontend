import { Metadata } from 'next';
import { EB_Garamond, Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
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
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${garamond.variable} ${advercase.variable} ${advercaseBold.variable} ${montserrat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
