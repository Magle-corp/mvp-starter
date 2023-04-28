import Head from 'next/head';
import SignUpCard from '@/features/authentication/templates/SignUpCard';

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
        <SignUpCard />
      </main>
    </>
  );
}
