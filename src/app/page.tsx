import Sidebar from '@/components/Sidebar';

const Home = async () => {
  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="hidden lg:block lg:col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-6">Main content</div>
        <div className="col-span-3">Who to follow</div>
      </div>
    </div>
  );
};

export default Home;
