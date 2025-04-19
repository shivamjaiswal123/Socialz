import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getRandomUsers } from '@/actions/user.actions';
import FollowButton from '@/components/FollowButton';
import Link from 'next/link';

const WhoToFollow = async () => {
  const users = await getRandomUsers();

  if (!users.length) {
    return;
  }

  return (
    <div className="sticky top-36">
      <Card>
        <CardHeader>
          <CardTitle>Who to follow</CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          {users.map((user) => (
            <div className="flex gap-3 mb-6">
              <Avatar>
                <AvatarImage src={user.image!} />
                <AvatarFallback>
                  {user.username.split('')[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Link href={`/profile/${user.username}`}>
                <div className="text-sm w-28">
                  <h3 className="font-semibold text-clip overflow-hidden">
                    {user.name}
                  </h3>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
              </Link>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default WhoToFollow;
