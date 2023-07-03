import { ReactElement } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Medias from '@/cdn/enums/Medias';
import useGetAnimal from '@/cdn/queries/useGetAnimal';
import {
  AuthContextWrapper,
  useAuthContext,
} from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/ui/layouts/BackOfficeContext';
import BackOfficeLayout from '@/ui/layouts/BackOfficeLayout';

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
      {animalQuery.data?.data && (
        <>
          <DynUpdateAnimalCard
            animal={animalQuery.data?.data}
            animalQuery={animalQuery}
          />
          <DynDocumentsListCard
            mediaType={Medias.ANIMAL_DOCUMENT}
            documents={animalQuery.data.data.documents}
            documentsQuery={animalQuery}
            relatedEntityId={animalQuery.data.data.id}
          />
        </>
      )}
    </>
  );
};

UpdateAnimal.getLayout = function getLayout(page: ReactElement) {
  return (
    <BackOfficeContextWrapper>
      <AuthContextWrapper>
        <BackOfficeLayout>{page}</BackOfficeLayout>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

const DynUpdateAnimalCard = dynamic(() =>
  import('@/features/animals/templates/UpdateAnimalCard').then(
    (UpdateAnimalCard) => UpdateAnimalCard
  )
);

const DynDocumentsListCard = dynamic(() =>
  import('@/features/documents/templates/DocumentsListCard').then(
    (DocumentsListCard) => DocumentsListCard
  )
);

export default UpdateAnimal;
