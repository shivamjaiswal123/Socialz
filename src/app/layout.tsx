import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Provider from '@/providers/providers';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import WhoToFollow from '@/components/WhoToFollow';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Navbar />
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2">
              {/* Sidebar */}
              <div className="hidden lg:block">
                <Sidebar />
              </div>

              {/* Main Content */}
              <main className="flex-1 border-x">{children}</main>

              {/* Who to Follow Section */}
              <div className="hidden w-[325px] p-2 md:block">
                <WhoToFollow />
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
