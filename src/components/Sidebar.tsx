import { getServerSession } from 'next-auth';
import UnauthenticatedSidebar from '@/components/UnauthenticatedSidebar';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authOptions } from '@/lib/authOptions';
import { getUserById } from '@/actions/user.actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <UnauthenticatedSidebar />
      </div>
    );
  }

  const user = await getUserById(session.user.uid);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={session.user.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-lg">{session.user?.name ?? ''}</span>
          </CardTitle>
          <CardDescription className="text-center">
            {user?.username}
          </CardDescription>
        </CardHeader>
        <CardDescription>
          <div className="flex justify-between px-4 pb-6">
            <div className="text-center">
              <span className="text-base">{user?._count.following}</span>
              <span className="block">Following</span>
            </div>
            <div className="text-center">
              <span className="text-base">{user?._count.followers}</span>
              <span className="block">Followers</span>
            </div>
          </div>
        </CardDescription>
      </Card>
    </div>
  );
};
export default Sidebar;
