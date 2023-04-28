import { ReactElement } from 'react';
import Head from 'next/head';
import SignInCard from '@/features/authentication/templates/SignInCard';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AuthGuard from '@/features/authentication/AuthGuard';

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

SignIn.getLayout = (page: ReactElement) => {
  return (
    <AuthContextWrapper>
      <AuthGuard>{page}</AuthGuard>
    </AuthContextWrapper>
  );
};

export default SignIn;
