import { ReactElement } from 'react';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AnimalsTableCard from '@/features/animals/templates/AnimalsTableCard';
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
      <AnimalsTableCard />
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

export default Animals;
