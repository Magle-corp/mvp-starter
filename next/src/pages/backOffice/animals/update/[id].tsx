import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynUpdateAnimalCard = dynamic(() =>
  import('@/features/animals/templates/UpdateAnimalCard').then(
    (UpdateAnimalCard) => UpdateAnimalCard
  )
);

const DynAnimalFileUploaderCard = dynamic(() =>
  import('@/features/animals/templates/AnimalFileUploaderCard').then(
    (UpdateAnimalCard) => UpdateAnimalCard
  )
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/layouts/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

const UpdateAnimal = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Mettre à jour un animal</title>
        <meta
          name="Mettre à jour un animal"
          content="Mettre à jour un animal"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynUpdateAnimalCard />
      <DynAnimalFileUploaderCard />
    </>
  );
};

UpdateAnimal.getLayout = function getLayout(page: ReactElement) {
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

export default UpdateAnimal;
