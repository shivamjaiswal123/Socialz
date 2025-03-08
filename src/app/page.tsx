import { getAllPosts } from '@/actions/post.action';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import WhoToFollow from '@/components/WhoToFollow';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

const Home = async () => {
  const session = await getServerSession(authOptions);
  const posts = await getAllPosts();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-2">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="border-x flex-1 p-4 space-y-4">
          <CreatePost />
          {posts.map((post) => (
            <PostCard post={post} userId={session?.user?.uid} />
          ))}
        </div>
        <div className="hidden w-[325px] p-2 md:block">
          <WhoToFollow />
        </div>
      </div>
    </div>
  );
};

export default Home;
