import Head from 'next/head';
import SignInCard from '@/features/authentication/templates/SignInCard';

const SignIn = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Connexion</title>
        <meta name="description" content="Page de connexion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignInCard />
      </main>
    </>
  );
};

export default SignIn;
