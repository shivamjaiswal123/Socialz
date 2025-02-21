import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginButton from '@/components/LoginButton';
import { Button } from '@/components/ui/button';

const UnauthenticatedSidebar = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Welcome Back!</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Login to access your account and connect with others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginButton>
            <Button size="lg" className="w-full">
              Login
            </Button>
          </LoginButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnauthenticatedSidebar;
