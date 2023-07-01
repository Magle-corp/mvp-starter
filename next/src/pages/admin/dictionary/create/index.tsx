import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynCreateVocabularyCard = dynamic(() =>
  import('@/features/dictionary/templates/CreateVocabularyCard').then(
    (CreateVocabularyCard) => CreateVocabularyCard
  )
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/layouts/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

const CreateVocabulary = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Créer du vocabulaire</title>
        <meta name="Créer du vocabulaire" content="Créer du vocabulaire" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynCreateVocabularyCard />
    </>
  );
};

CreateVocabulary.getLayout = function getLayout(page: ReactElement) {
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

export default CreateVocabulary;