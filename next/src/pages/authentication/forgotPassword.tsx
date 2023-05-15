import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynForgotPasswordCard = dynamic(() =>
  import('@/features/authentication/templates/ForgotPasswordCard').then(
    (ForgotPasswordCard) => ForgotPasswordCard
  )
);

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>Mot de passe oublié</title>
        <meta name="description" content="Mot de passe oublié" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DynForgotPasswordCard />
      </main>
    </>
  );
}
