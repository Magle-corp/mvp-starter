import { ReactElement } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/ui/layouts/BackOfficeContext';
import BackOfficeLayout from '@/ui/layouts/BackOfficeLayout';

const CreateAnimal = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Créer animal</title>
        <meta name="Créer animal" content="Créer animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynCreateAnimalCard />
    </>
  );
};

CreateAnimal.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextWrapper>
      <BackOfficeContextWrapper>
        <BackOfficeLayout>{page}</BackOfficeLayout>
      </BackOfficeContextWrapper>
    </AuthContextWrapper>
  );
};

const DynCreateAnimalCard = dynamic(() =>
  import('@/features/animals/templates/CreateAnimalCard').then(
    (CreateAnimalCard) => CreateAnimalCard
  )
);

export default CreateAnimal;
