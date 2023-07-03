import { ReactElement } from 'react';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import Medias from '@/cdn/enums/Medias';
import useGetAnimalDocuments from '@/cdn/queries/useGetAnimalDocuments';
import {
  AuthContextWrapper,
  useAuthContext,
} from '@/features/authentication/AuthContext';
import DocumentsTableCard from '@/features/documents/templates/DocumentsTableCard';
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
        <DocumentsTableCard
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

export default Documents;
