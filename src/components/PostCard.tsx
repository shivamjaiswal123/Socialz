'use client';

import { createComment, getAllPosts, toggleLike } from '@/actions/post.action';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  BookmarkIcon,
  HeartIcon,
  Loader2,
  MessageCircleIcon,
  SendIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import { redirect } from 'next/navigation';

type Posts = Awaited<ReturnType<typeof getAllPosts>>;
type Post = Posts[number];

const PostCard = ({ post, userId }: { post: Post; userId: string }) => {
  const session = useSession();

  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === userId)
  );
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const handleLike = async () => {
    if (!session.data) {
      redirect('signin');
    }
    // if liking post is in progress
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptimisticLikes((prev) => prev + (hasLiked ? -1 : +1));
      await toggleLike(post.id);
    } catch (error) {
      setOptimisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === userId));
    } finally {
      setIsLiking(false);
    }
  };

  const handleNewComment = async () => {
    if (isCommenting) return;
    try {
      setIsCommenting(true);
      const response = await createComment(post.id, newComment);
      if (response.success) {
        setNewComment('');
      }
    } catch (error) {
      toast.error('Failed to post your comment. Please try again.');
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="flex gap-2 mt-4">
          <Avatar>
            <AvatarImage src={post.author.image!} />
            <AvatarFallback>
              {post.author.name.split('')[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            {/* Name and username */}
            <div className="space-x-2">
              <span>{post.author.name}</span>
              <span className="text-sm text-muted-foreground">
                @{post.author.username}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground text-sm">
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </span>
            </div>

            {/* Post content */}
            <div>{post.content}</div>
            {post.image && (
              <div>
                <img
                  src={post.image}
                  alt="post image"
                  className="h-auto object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Like, Comment and Bookmark button */}
      <CardFooter>
        <div className="flex flex-col items-start w-full">
          <div className="ml-8 space-x-4">
            {/* Like */}
            <Button
              variant="ghost"
              className={`text-muted-foreground ${
                hasLiked
                  ? 'text-red-500 hover:text-red-600'
                  : 'hover:text-red-500'
              }`}
              onClick={handleLike}
            >
              {hasLiked ? (
                <HeartIcon className="fill-current" />
              ) : (
                <HeartIcon />
              )}
              {optimisticLikes}
            </Button>

            {/* Comment */}
            <Button
              variant="ghost"
              className={`text-muted-foreground gap-2 ${
                showComment
                  ? 'text-blue-500 hover:text-blue-600'
                  : 'hover:text-blue-500'
              } `}
              onClick={() => {
                if (!session.data) {
                  redirect('signin');
                }
                setShowComment((prev) => !prev);
              }}
            >
              {showComment ? (
                <MessageCircleIcon className="fill-current" />
              ) : (
                <MessageCircleIcon />
              )}
              <span>{post.comments.length}</span>
            </Button>

            {/* Bookmark */}
            <Button
              variant="ghost"
              className="text-muted-foreground gap-2 hover:text-blue-500"
            >
              <BookmarkIcon />
            </Button>
          </div>

          {/* Comment section */}
          {showComment && (
            <div className="space-y-4 mt-3 pt-4 w-full border-t">
              {/*Display All Comments */}
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar className="size-8">
                      <AvatarImage src={comment.author.image!} />
                      <AvatarFallback>
                        {comment.author.name.split('')[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <div className="space-x-2">
                        <span>{comment.author.name}</span>
                        <span className="text-sm text-muted-foreground">
                          @{comment.author.username}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt))} ago
                        </span>
                      </div>
                      <div className="text-sm">{comment.content}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment post area */}
              {session.data && (
                <>
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src={session.data.user?.image!} />
                      <AvatarFallback>
                        {session.data.user?.name?.split('')[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="resize-none min-h-20"
                    />
                  </div>
                  <div className="text-end">
                    <Button
                      size="sm"
                      onClick={handleNewComment}
                      disabled={isCommenting || !newComment.trim()}
                    >
                      {isCommenting ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Posting
                        </>
                      ) : (
                        <>
                          <SendIcon />
                          Comment
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
