import { getAllPosts } from '@/actions/post.action';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

const Home = async () => {
  const session = await getServerSession(authOptions);
  const posts = await getAllPosts();

  return (
    <div className="p-4 space-y-4">
      <CreatePost />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} userId={session?.user?.uid} />
      ))}
    </div>
  );
};

export default Home;
