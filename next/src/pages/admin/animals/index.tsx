import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynAnimalsTableCard = dynamic(() =>
  import('@/features/animals/templates/AnimalsTableCard').then(
    (AnimalsTableCard) => AnimalsTableCard
  )
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/layouts/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

const Animals = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Animaux</title>
        <meta name="Animaux" content="Animaux" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynAnimalsTableCard />
    </>
  );
};

Animals.getLayout = function getLayout(page: ReactElement) {
  return (
    <BackOfficeContextWrapper>
      <AuthContextWrapper>
        <DynAuthGuard>
          <DynBackOfficeLayout>{page}</DynBackOfficeLayout>
        </DynAuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default Animals;