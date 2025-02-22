'use client';
import ThemeProvider from '@/providers/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>{children}</SessionProvider>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
};

export default Provider;
