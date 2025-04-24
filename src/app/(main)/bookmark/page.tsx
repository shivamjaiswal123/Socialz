import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Notification = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }
  return (
    <div className="space-y-4">
      <Card className="rounded-none border-none">
        <CardHeader className="border-b">
          <CardTitle>Saved Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="p-4 text-center text-muted-foreground">
              Looks empty here — start saving your favorite posts!
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notification;
