import Head from 'next/head';
import SignInTemplate from '@/features/authentication/templates/SignInTemplate';

export default function SignIn() {
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
}
