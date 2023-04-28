import Head from 'next/head';
import ForgotPasswordCard from '@/features/authentication/templates/ForgotPasswordCard';

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
        <ForgotPasswordCard />
      </main>
    </>
  );
}
