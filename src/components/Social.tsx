import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Social = () => {
  return (
    <div className="space-y-2">
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          signIn('google', { callbackUrl: '/' });
        }}
        variant="outline"
        size="lg"
        className="w-full"
      >
        <FcGoogle />
        Google
      </Button>
    </div>
  );
};

export default Social;
