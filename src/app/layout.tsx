import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from '@/providers/providers';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Socialz',
  description: 'A modern social media application powered by Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Provider>
          <Navbar />
          <div className="max-w-7xl mx-auto">
            {/* Main Content */}
            <main>{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
