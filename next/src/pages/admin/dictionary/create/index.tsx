import { ReactElement } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/ui/layouts/BackOfficeContext';
import BackOfficeLayout from '@/ui/layouts/BackOfficeLayout';

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
        <BackOfficeLayout>{page}</BackOfficeLayout>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

const DynCreateVocabularyCard = dynamic(() =>
  import('@/features/dictionary/templates/CreateVocabularyCard').then(
    (CreateVocabularyCard) => CreateVocabularyCard
  )
);

export default CreateVocabulary;
