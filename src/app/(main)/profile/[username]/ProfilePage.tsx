'use client';

import { getProfileByUsername, getUserPosts } from '@/actions/profile.actions';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, EditIcon, FileTextIcon, HeartIcon } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { toggleFollow } from '@/actions/user.actions';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/PostCard';

type User = Awaited<ReturnType<typeof getProfileByUsername>>;
type Posts = Awaited<ReturnType<typeof getUserPosts>>;

interface ProfilePageProps {
  user: NonNullable<User>;
  posts: Posts;
  likedPosts: Posts;
  isFollowing: boolean;
}

function ProfilePage({
  user,
  posts,
  likedPosts,
  isFollowing: initialIsFollowing,
}: ProfilePageProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);

  const currUser = useSession();
  const isOwnProfile =
    currUser.data?.user?.email === user.email ||
    currUser.data?.user?.email?.split('@')[0] == user.username;

  const formattedDate = format(new Date(user.createdAt), 'MMMM yyyy');

  const handleFollow = async () => {
    if (!currUser) return;

    try {
      setIsUpdatingFollow(true);
      await toggleFollow(user.id);
      setIsFollowing(!isFollowing);
    } catch (error) {
      toast.error('Failed to update follow status');
    } finally {
      setIsUpdatingFollow(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full max-w-lg mx-auto">
          <Card className="mt-4 mx-4">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.image ?? '/avatar.png'} />
                </Avatar>
                <h1 className="mt-4 text-2xl font-bold">
                  {user.name ?? user.username}
                </h1>
                <p className="text-muted-foreground">@{user.username}</p>
                <p className="mt-2 text-sm">{user.bio}</p>

                {/* PROFILE STATS */}
                <div className="w-full mt-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="font-semibold">
                        {user._count.following.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Followers
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      <div className="font-semibold">
                        {user._count.followers.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Following
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      <div className="font-semibold">
                        {user._count.posts.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* "FOLLOW & EDIT PROFILE" BUTTONS */}
              {isOwnProfile ? (
                <Button className="w-full mt-4">
                  <EditIcon className="size-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <Button
                  className="w-full mt-4"
                  onClick={handleFollow}
                  disabled={isUpdatingFollow}
                  variant={isFollowing ? 'outline' : 'default'}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              )}

              <div className="flex items-center text-sm mt-4">
                <CalendarIcon className="size-4 mr-2" />
                Joined {formattedDate}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full flex justify-center border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="posts"
              className="flex-1 gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
               data-[state=active]:bg-transparent py-3 font-semibold"
            >
              <FileTextIcon className="size-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="flex-1 gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
               data-[state=active]:bg-transparent py-3 font-semibold"
            >
              <HeartIcon className="size-4" />
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="space-y-6 mx-4 mb-4">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} userId={user.id} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No posts yet
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <div className="space-y-6 mx-4 mb-6">
              {likedPosts.length > 0 ? (
                likedPosts.map((post) => (
                  <PostCard key={post.id} post={post} userId={user.id} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No liked posts to show
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;
