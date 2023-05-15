import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynCreateAnimalCard = dynamic(() =>
  import('@/features/animals/templates/CreateAnimalCard').then(
    (CreateAnimalCard) => CreateAnimalCard
  )
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/layouts/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

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
    <BackOfficeContextWrapper>
      <AuthContextWrapper>
        <DynAuthGuard>
          <DynBackOfficeLayout>{page}</DynBackOfficeLayout>
        </DynAuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default CreateAnimal;
