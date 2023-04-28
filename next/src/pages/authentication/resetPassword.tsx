import Head from 'next/head';
import ResetPasswordCard from '@/features/authentication/templates/ResetPasswordCard';

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>Changer mot de passe</title>
        <meta name="description" content="Changer mot de passe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ResetPasswordCard />
      </main>
    </>
  );
}
