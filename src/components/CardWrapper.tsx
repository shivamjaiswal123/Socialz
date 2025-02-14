import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

interface CardWrapperProps {
  header: string;
  description: string;
  children: React.ReactNode;
  instructionLabel: string;
  instructionHref: string;
  instructionLink: string;
}

const CardWrapper = ({
  header,
  description,
  children,
  instructionLabel,
  instructionHref,
  instructionLink,
}: CardWrapperProps) => {
  return (
    <div className="h-screen flex justify-center items-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{header}</CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            {instructionLabel}{' '}
            <Link
              href={instructionHref}
              className="text-primary underline-offset-4 hover:underline"
            >
              {instructionLink}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardWrapper;
