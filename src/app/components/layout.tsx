import { Metadata, Viewport } from 'next';
import * as React from 'react';

import '@/styles/colors.css';

export const metadata: Metadata = {
  title: 'prism components',
  description: 'dont trust, verify',
};

export const viewport: Viewport = {
  themeColor: '#131111',
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
