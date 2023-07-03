import { ReactElement } from 'react';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import CreateAnimalCard from '@/features/animals/templates/CreateAnimalCard';
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
      <CreateAnimalCard />
    </>
  );
};

CreateAnimal.getLayout = function getLayout(page: ReactElement) {
  return (
    <BackOfficeContextWrapper>
      <AuthContextWrapper>
        <BackOfficeLayout>{page}</BackOfficeLayout>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default CreateAnimal;
