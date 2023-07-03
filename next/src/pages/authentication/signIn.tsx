import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynSignInCard = dynamic(() =>
  import('@/features/authentication/templates/SignInCard').then(
    (SignInCard) => SignInCard
  )
);

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
        <DynSignInCard />
      </main>
    </>
  );
};

export default SignIn;
