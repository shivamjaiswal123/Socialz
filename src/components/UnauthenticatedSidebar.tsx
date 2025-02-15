import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginButton from './LoginButton';
import { Button } from './ui/button';

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
        <CardFooter>
          {/* <LoginButton> */}
          <Button size="lg" className="w-full">
            Login
          </Button>
          {/* </LoginButton> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnauthenticatedSidebar;
