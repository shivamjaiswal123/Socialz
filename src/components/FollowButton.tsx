'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toggleFollow } from '@/actions/user.actions';
import { toast } from 'sonner';

const FollowButton = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [following, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const response = await toggleFollow(userId);
      if (!response.success) {
        toast.error('Something went wrong!');
        return;
      }
      if (!following) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    } catch (error) {
      console.log('Error in following user: ', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button onClick={handleFollow} className="rounded-full w-24">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : following ? (
        'following'
      ) : (
        'follow'
      )}
    </Button>
  );
};

export default FollowButton;
