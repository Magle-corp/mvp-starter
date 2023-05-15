import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynResetPasswordCard = dynamic(() =>
  import('@/features/authentication/templates/ResetPasswordCard').then(
    (ResetPasswordCard) => ResetPasswordCard
  )
);

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
        <DynResetPasswordCard />
      </main>
    </>
  );
}
