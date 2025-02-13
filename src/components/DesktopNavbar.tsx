'use client';
import { BellIcon, HomeIcon } from 'lucide-react';
import ModeToggle from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LogoutButton from '@/components/LogoutButton';
import LoginButton from '@/components/LoginButton';

const DesktopNavbar = () => {
  const session = useSession();

  return (
    <div className="hidden md:flex space-x-4">
      <ModeToggle />
      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon />
          <span>Home</span>
        </Link>
      </Button>

      {session?.data ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/">
              <BellIcon />
              <span>Notification</span>
            </Link>
          </Button>

          <LogoutButton>
            <Button variant="outline">Logout</Button>
          </LogoutButton>
        </>
      ) : (
        <LoginButton>
          <Button>Login</Button>
        </LoginButton>
      )}
    </div>
  );
};

export default DesktopNavbar;
