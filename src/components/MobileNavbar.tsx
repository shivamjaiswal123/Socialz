import ModeToggle from '@/components/ModeToggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  BellIcon,
  Bookmark,
  HomeIcon,
  MenuIcon,
  User2Icon,
} from 'lucide-react';
import Link from 'next/link';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { getServerSession } from 'next-auth';

const MobileNavbar = async () => {
  const session = await getServerSession();

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
            <Link
              href="/"
              className="font-semibold flex gap-4 items-center py-2"
            >
              <HomeIcon />
              <span>Home</span>
            </Link>

            {session ? (
              <>
                <Link
                  href="/notification"
                  className="font-semibold flex gap-4 items-center py-2"
                >
                  <BellIcon />
                  <span>Notifications</span>
                </Link>

                <Link
                  href="/bookmark"
                  className="font-semibold flex gap-4 items-center py-2"
                >
                  <Bookmark />
                  <span>Bookmark</span>
                </Link>

                <Link
                  href="/profile"
                  className="font-semibold flex gap-4 items-center py-2"
                >
                  <User2Icon />
                  <span>Profile</span>
                </Link>

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
