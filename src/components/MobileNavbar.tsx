'use client';
import ModeToggle from '@/components/ModeToggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BellIcon, HomeIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import LoginButton from '@/components/LoginButton';
import { useSession } from 'next-auth/react';
import LogoutButton from '@/components/LogoutButton';

const MobileNavbar = () => {
  const session = useSession();

  return (
    <div className="md:hidden space-x-2">
      <ModeToggle />

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 space-y-4">
            <Button
              variant="ghost"
              className="flex justify-start items-center gap-2"
              asChild
            >
              <Link href="/">
                <HomeIcon />
                <span>Home</span>
              </Link>
            </Button>
            {session.data ? (
              <>
                <Button
                  variant="ghost"
                  className="flex justify-start items-center gap-2"
                  asChild
                >
                  <Link href="/">
                    <BellIcon />
                    <span>Notification</span>
                  </Link>
                </Button>

                <LogoutButton>
                  <Button variant="destructive" className="w-full">
                    Logout
                  </Button>
                </LogoutButton>
              </>
            ) : (
              <>
                <LoginButton>
                  <Button className="w-full">Login</Button>
                </LoginButton>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
