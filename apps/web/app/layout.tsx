import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import './globals.css';

const syne = localFont({
  src: './fonts/syne-latin-variable.woff2',
  variable: '--font-syne',
  weight: '400 800',
  style: 'normal',
  display: 'swap',
  fallback: ['Arial Black', 'Helvetica Neue', 'Arial'],
});

const outfit = localFont({
  src: './fonts/outfit-latin-variable.woff2',
  variable: '--font-outfit',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  fallback: ['Avenir Next', 'Avenir', 'Helvetica Neue', 'Arial'],
});

export const metadata: Metadata = {
  title: {
    default: 'CCV',
    template: '%s | CCV',
  },
  description: 'Dirección e integración de marketing.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html className={`${syne.variable} ${outfit.variable}`} lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
