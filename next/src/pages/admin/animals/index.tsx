import { ReactElement } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/ui/layouts/BackOfficeContext';
import BackOfficeLayout from '@/ui/layouts/BackOfficeLayout';

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
        <BackOfficeLayout>{page}</BackOfficeLayout>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

const DynAnimalsTableCard = dynamic(() =>
  import('@/features/animals/templates/AnimalsTableCard').then(
    (AnimalsTableCard) => AnimalsTableCard
  )
);

export default Animals;
