import Head from 'next/head';
import SignUpValidationCard from '@/features/authentication/templates/SignUpValidationCard';

export default function SignUpValidation() {
  return (
    <>
      <Head>
        <title>Validation inscription</title>
        <meta
          name="validation inscription"
          content="Page de validation d'inscription"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignUpValidationCard />
      </main>
    </>
  );
}
