import Head from 'next/head';
import SignUpTemplate from '@/features/authentication/templates/SignUpTemplate';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Inscription</title>
        <meta name="description" content="Page d'inscription" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignUpTemplate />
      </main>
    </>
  );
}
