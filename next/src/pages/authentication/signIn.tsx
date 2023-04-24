import { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from '@/cdn/layouts/AdminLayout';
import SignInTemplate from '@/features/authentication/templates/SignInTemplate';

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
        <SignInTemplate />
      </main>
    </>
  );
};

SignIn.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default SignIn;
