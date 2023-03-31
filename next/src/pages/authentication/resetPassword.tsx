import Head from 'next/head';
import ResetPasswordTemplate from '@/features/authentication/templates/ResetPasswordTemplate';

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
        <ResetPasswordTemplate />
      </main>
    </>
  );
}
