import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynUpdateVocabularyCard = dynamic(() =>
  import('@/features/dictionary/templates/UpdateVocabularyCard').then(
    (AnimalsTableCard) => AnimalsTableCard
  )
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/layouts/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

const UpdateVocabulary = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Mettre à jour un vocabulaire</title>
        <meta
          name="Mettre à jour un vocabulaire"
          content="Mettre à jour un vocabulaire"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynUpdateVocabularyCard />
    </>
  );
};

UpdateVocabulary.getLayout = function getLayout(page: ReactElement) {
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

export default UpdateVocabulary;
