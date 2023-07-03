import { ReactElement } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/ui/layouts/BackOfficeContext';
import BackOfficeLayout from '@/ui/layouts/BackOfficeLayout';

const UpdateVocabulary = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Mettre à jour du vocabulaire</title>
        <meta
          name="Mettre à jour du vocabulaire"
          content="Mettre à jour du vocabulaire"
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
        <BackOfficeLayout>{page}</BackOfficeLayout>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

const DynUpdateVocabularyCard = dynamic(() =>
  import('@/features/dictionary/templates/UpdateVocabularyCard').then(
    (UpdateVocabularyCard) => UpdateVocabularyCard
  )
);

export default UpdateVocabulary;
