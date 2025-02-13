import { signIn } from 'next-auth/react';

interface LoginButtonProps {
  children: React.ReactNode;
}

const LoginButton = ({ children }: LoginButtonProps) => {
  return <div onClick={() => signIn()}>{children}</div>;
};

export default LoginButton;
