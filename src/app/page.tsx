import CreatePost from '@/components/CreatePost';
import Sidebar from '@/components/Sidebar';
import WhoToFollow from '@/components/WhoToFollow';

const Home = async () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-2">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="border-x flex-1 p-4">
          <CreatePost />
        </div>
        <div className="hidden w-[350] p-2 md:block">
          <WhoToFollow />
        </div>
      </div>
    </div>
  );
};

export default Home;
