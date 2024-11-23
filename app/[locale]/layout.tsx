"use client";

import '../globals.css';
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';
import { locales } from '@/config';
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();

  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <Toaster position="top-right" />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}