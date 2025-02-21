import { getServerSession } from 'next-auth';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

const WhoToFollow = async () => {
  const session = await getServerSession();

  return (
    <div className="sticky top-36">
      <Card>
        <CardHeader>
          <CardTitle>Who to follow</CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <h3 className="font-semibold text-clip">Shivam Jaiswal</h3>
              <p className="text-muted-foreground">@shivamj</p>
            </div>
            <Button className="rounded-full w-24">Follow</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhoToFollow;
