import { getNotifications } from '@/actions/notification.actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { HeartIcon, MessageCircleIcon, UserPlusIcon } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'LIKE':
      return <HeartIcon className="text-red-500 fill-current" />;
    case 'COMMENT':
      return <MessageCircleIcon className="text-blue-500" />;
    case 'FOLLOW':
      return <UserPlusIcon className="text-black" />;
    default:
      return null;
  }
};

const Notification = async () => {
  const session = await getServerSession();
  const notifications = await getNotifications();

  if (!session) {
    redirect('/signin');
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-none border-none">
        <CardHeader className="border-b">
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {notifications?.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No notifications yet
              </div>
            ) : (
              notifications?.map((notification) => (
                <div
                  key={notification.id}
                  className=" gap-4 p-4 border-b hover:bg-muted/25 transition-colors"
                >
                  <div className="flex gap-4 items-center mb-3">
                    {getNotificationIcon(notification.type)}
                    <Avatar>
                      <AvatarImage src={notification.creator.image!} />
                      <AvatarFallback>
                        {notification.creator?.name?.split('')[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center gap-2">
                      <span>
                        <span className="font-semibold">
                          {notification.creator.name}
                        </span>{' '}
                        {notification.type === 'FOLLOW'
                          ? 'started following you'
                          : notification.type === 'LIKE'
                          ? 'liked your post'
                          : 'commented on your post'}
                      </span>
                      <span>
                        <p className="text-sm text-muted-foreground pl-6">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            { addSuffix: true }
                          )}
                        </p>
                      </span>
                    </div>

                    {notification.post &&
                      (notification.type === 'LIKE' ||
                        notification.type === 'COMMENT') && (
                        <div className="pl-6 space-y-2">
                          <div className="text-sm text-muted-foreground rounded-md p-3 bg-muted/80 mt-2">
                            <p>{notification.post.content}</p>
                          </div>

                          {notification.type === 'COMMENT' &&
                            notification.comment && (
                              <div className="text-sm p-2 bg-accent/50 rounded-md">
                                {notification.comment.content}
                              </div>
                            )}
                        </div>
                      )}
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notification;
