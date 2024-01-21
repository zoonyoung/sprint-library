import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import AuthContext from '@/context/AuthContext';
import Navbar from '@/context/components/Navbar';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sprint Library',
  description: 'Book rental system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={openSans.className}>
        <AuthContext>
          <header>
            <Navbar />
          </header>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
