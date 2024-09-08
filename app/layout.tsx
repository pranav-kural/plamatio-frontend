import type {Metadata} from 'next';
import {Work_Sans} from 'next/font/google';
import './globals.css';
import {Header} from './components/header/header';
import {ReduxProvider} from './ReduxProvider';
import LoadCartItems from './components/auxiliary/LoadCartItems';
import LoadProducts from './components/auxiliary/LoadProducts';

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
    <html lang="en">
      <ReduxProvider>
        <body
          className={`${workSans.className} w-full h-full flex flex-row align-middle justify-center bg-fuchsia-50/15`}>
          <div className="max-w-[1620px]">
            <Header />
            {children}
          </div>
        </body>
        <LoadCartItems />
        <LoadProducts />
      </ReduxProvider>
    </html>
  );
}
