import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth';

const Home = async () => {
  const session = await getServerSession();
  console.log('server: ', session);

  return <div>{session?.user?.name}</div>;
};

export default Home;
