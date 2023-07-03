import { ReactElement } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Medias from '@/cdn/enums/Medias';
import useGetAnimalDocuments from '@/cdn/queries/useGetAnimalDocuments';
import {
  AuthContextWrapper,
  useAuthContext,
} from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/ui/layouts/BackOfficeContext';
import BackOfficeLayout from '@/ui/layouts/BackOfficeLayout';

const Documents = (): JSX.Element => {
  const { token, organization } = useAuthContext();

  const animalDocumentsQuery = useGetAnimalDocuments({
    organizationId: organization?.id,
    token: token?.token,
  });

  return (
    <>
      <Head>
        <title>Documents</title>
        <meta name="Documents" content="Documents" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {animalDocumentsQuery.data?.data && (
        <DynDocumentsTableCard
          mediaType={Medias.ANIMAL_DOCUMENT}
          documents={animalDocumentsQuery.data.data['hydra:member']}
          documentsQuery={animalDocumentsQuery}
        />
      )}
    </>
  );
};

Documents.getLayout = function getLayout(page: ReactElement) {
  return (
    <BackOfficeContextWrapper>
      <AuthContextWrapper>
        <BackOfficeLayout>{page}</BackOfficeLayout>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

const DynDocumentsTableCard = dynamic(() =>
  import('@/features/documents/templates/DocumentsTableCard').then(
    (DocumentsTableCard) => DocumentsTableCard
  )
);

export default Documents;
