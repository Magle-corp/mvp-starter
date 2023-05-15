import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynSignUpCard = dynamic(() =>
  import('@/features/authentication/templates/SignUpCard').then(
    (SignUpCard) => SignUpCard
  )
);

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
        <DynSignUpCard />
      </main>
    </>
  );
}
