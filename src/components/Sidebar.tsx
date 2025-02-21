import { getServerSession } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  BellIcon,
  Bookmark,
  HomeIcon,
  MoreHorizontal,
  User2Icon,
} from 'lucide-react';
import LoginButton from '@/components/LoginButton';

const navItems = [
  {
    title: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    title: 'Notifications',
    icon: BellIcon,
    href: '/notification',
  },
  {
    title: 'Bookmark',
    icon: Bookmark,
    href: '/bookmark',
  },
  {
    title: 'Profile',
    icon: User2Icon,
    href: '/profile',
  },
];

const Sidebar = async () => {
  const session = await getServerSession();

  return (
    <div className="sticky top-16 w-[275px] h-[calc(100vh-4rem)] flex flex-col p-2 bg-background/95 backdrop-blur">
      {/* Navigation */}
      <nav className="flex-1 space-y-2 py-4">
        {navItems.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 rounded-full px-4 py-3 transition-all duration-200 ease-in-out hover:bg-accent"
            >
              <div>
                <item.icon
                  className="size-7 transition-all duration-200 group-hover:scale-110"
                  strokeWidth={1.75}
                />
              </div>
              <span className="text-xl font-semibold">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Post Button */}
      <div className="px-4 py-2">
        <Button
          className="w-full rounded-full py-6 text-lg font-bold shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md active:scale-95"
          size="lg"
        >
          {session ? 'Post' : 'Sign in'}
        </Button>
      </div>

      {/* User Profile */}
      {session ? (
        <div className="mt-auto px-4 py-3">
          <button className="group flex w-full items-center gap-3 rounded-full p-3 transition-all duration-200 hover:bg-accent">
            <div className="h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage
                  src={session.user?.image || ''}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
                />
                <AvatarFallback>
                  {session.user?.name?.split('')[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold">{session.user?.name}</span>
              <span className="text-sm text-muted-foreground">
                @{session.user?.email?.split('@')[0]}
              </span>
            </div>
            <MoreHorizontal className="ml-auto h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </div>
      ) : (
        <div className="mt-auto px-4 py-3">
          <div className="rounded-xl bg-accent/40 p-4">
            <h3 className="mb-2 font-bold">New to the platform?</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Sign up now to share your thoughts and connect with others.
            </p>
            <LoginButton>
              <Button
                className="w-full rounded-full font-bold shadow-sm transition-all duration-200 hover:shadow-md active:scale-95"
                size="lg"
              >
                Create account
              </Button>
            </LoginButton>
          </div>
        </div>
      )}
    </div>
  );
};
export default Sidebar;
