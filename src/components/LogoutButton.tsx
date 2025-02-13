import { signOut } from 'next-auth/react';

interface LogoutButtonProps {
  children: React.ReactNode;
}
const LogoutButton = ({ children }: LogoutButtonProps) => {
  return <div onClick={() => signOut()}>{children}</div>;
};

export default LogoutButton;
