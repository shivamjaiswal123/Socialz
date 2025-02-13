import Link from 'next/link';
import DesktopNavbar from '@/components/DesktopNavbar';
import MobileNavbar from '@/components/MobileNavbar';

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto h-16 flex justify-between items-center px-6">
        {/* logo */}
        <div>
          <Link href="/" className="text-xl font-bold font-mono tracking-wider">
            Socialz
          </Link>
        </div>
        {/* nav items */}
        <div>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
