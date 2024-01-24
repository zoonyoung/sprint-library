import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import AuthContext from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import SWRConfigcontext from '@/context/SWRConfigContext';

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
          <SWRConfigcontext>
            <Navbar />
            {children}
          </SWRConfigcontext>
        </AuthContext>
      </body>
    </html>
  );
}
