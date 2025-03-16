import Sidebar from '@/components/Sidebar';
import WhoToFollow from '@/components/WhoToFollow';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
