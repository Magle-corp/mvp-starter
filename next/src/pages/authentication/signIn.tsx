import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

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

SignIn.getLayout = (page: ReactElement) => {
  return (
    <AuthContextWrapper>
      <DynAuthGuard>{page}</DynAuthGuard>
    </AuthContextWrapper>
  );
};

export default SignIn;
