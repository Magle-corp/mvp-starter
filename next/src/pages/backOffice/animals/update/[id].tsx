import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import useGetAnimal from '@/cdn/queries/useGetAnimal';
import {
  AuthContextWrapper,
  useAuthContext,
} from '@/features/authentication/AuthContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynUpdateAnimalCard = dynamic(() =>
  import('@/features/animals/templates/UpdateAnimalCard').then(
    (UpdateAnimalCard) => UpdateAnimalCard
  )
);

const DynAnimalDocumentsCardCard = dynamic(() =>
  import('@/features/animals/templates/AnimalDocumentsCard').then(
    (AnimalDocumentsCard) => AnimalDocumentsCard
  )
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/layouts/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

const UpdateAnimal = (): JSX.Element => {
  const router = useRouter();
  const { id: animalQueryId } = router.query;
  const { token } = useAuthContext();

  const animalQuery = useGetAnimal({
    entityId: parseInt(animalQueryId as string),
    token: token?.token,
  });

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
      <DynUpdateAnimalCard animalQuery={animalQuery} />
      <DynAnimalDocumentsCardCard animalQuery={animalQuery} />
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
