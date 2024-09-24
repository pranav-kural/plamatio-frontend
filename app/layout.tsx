import type {Metadata} from 'next';
import {Work_Sans} from 'next/font/google';
import './globals.css';
import {ClerkProvider} from '@clerk/nextjs';
import {Header} from './components/header/Header';
import {ReduxProvider} from './ReduxProvider';
import LoadCartItems from './components/auxiliary/LoadCartItems';
import LoadProducts from './components/auxiliary/LoadProducts';
import {CreateUserBridge} from './components/landing/CreateUserBridge';
import {Analytics} from '@vercel/analytics/react';
import DemoHeadline from './components/header/DemoHeadline';

const workSans = Work_Sans({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Plamatio',
  description: 'Shop Llama Everything',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#4c1e95',
          colorBackground: '#fdf4ff10',
        },
      }}>
      <html lang="en">
        <ReduxProvider>
          <body
            className={`${workSans.className} w-full h-full flex flex-row align-middle justify-center bg-fuchsia-50/15`}>
            <div className="max-w-[1620px]">
              <DemoHeadline />
              <Header />
              {children}
            </div>
            <Analytics />
          </body>
          <LoadCartItems />
          <LoadProducts />
          <CreateUserBridge />
        </ReduxProvider>
      </html>
    </ClerkProvider>
  );
}
