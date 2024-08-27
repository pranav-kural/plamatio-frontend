import type {Metadata} from 'next';
import {Work_Sans} from 'next/font/google';
import '@radix-ui/themes/styles.css';
import {Box, Container, Theme} from '@radix-ui/themes';
import './globals.css';
import {Header} from './components/nav/header';

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
      <body className={workSans.className}>
        <Theme>
          <Box>
            <Container size="1">
              <Header />
              {children}
            </Container>
          </Box>
        </Theme>
      </body>
    </html>
  );
}
