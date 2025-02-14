import { getServerSession } from 'next-auth';

const Home = async () => {
  const session = await getServerSession();

  return <div>{session?.user?.name}</div>;
};

export default Home;
