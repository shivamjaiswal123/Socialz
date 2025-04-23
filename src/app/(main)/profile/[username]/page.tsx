import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from '@/actions/profile.actions';
import { notFound, redirect } from 'next/navigation';
import ProfilePage from './ProfilePage';
import { getServerSession } from 'next-auth';

type tParams = Promise<{
  username: string;
}>;

export async function generateMetadata({ params }: { params: tParams }) {
  const { username } = await params;
  const user = await getProfileByUsername(username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

const UserProfile = async ({ params }: { params: tParams }) => {
  const session = await getServerSession();
  const { username } = await params;
  const user = await getProfileByUsername(username);

  if (!session) redirect('/signin');

  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePage
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
};

export default UserProfile;
