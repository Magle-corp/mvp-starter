import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import Medias from '@/cdn/enums/Medias';
import useGetAnimalDocuments from '@/cdn/queries/useGetAnimalDocuments';
import {
  AuthContextWrapper,
  useAuthContext,
} from '@/features/authentication/AuthContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynDocumentsTableCard = dynamic(() =>
  import('@/features/documents/templates/DocumentsTableCard').then(
    (DocumentsTableCard) => DocumentsTableCard
  )
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/layouts/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

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
        <DynAuthGuard>
          <DynBackOfficeLayout>{page}</DynBackOfficeLayout>
        </DynAuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default Documents;
