'use client';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Image, Loader2, SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createPost } from '@/actions/post.action';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPosting, setIsposting] = useState(false);

  const session = useSession();

  const handleCreatePost = async () => {
    try {
      setIsposting(true);
      const res = await createPost(content, imageUrl);
      if (res.success) {
        setContent('');
        setImageUrl('');
      }
    } catch (error) {
    } finally {
      setIsposting(false);
    }
  };
  return (
    <div>
      <Card className="p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={session.data?.user?.image!} />
            <AvatarFallback>
              {session.data?.user?.name?.split('')[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPosting}
            className="min-h-20 border-none resize-none focus-visible:ring-0 shadow-none p-0 md:text-base"
            placeholder="What's on your mind?"
          />
        </div>

        <Separator />

        <div className="mt-4 flex justify-between items-center">
          <Button variant="ghost">
            <Image />
            Photo
          </Button>

          <Button
            disabled={!content.trim() || isPosting}
            onClick={handleCreatePost}
          >
            {isPosting ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <SendIcon />
                <span>Post</span>
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreatePost;
