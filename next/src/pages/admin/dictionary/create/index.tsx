import { ReactElement } from 'react';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import CreateVocabularyCard from '@/features/dictionary/templates/CreateVocabularyCard';
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
      <CreateVocabularyCard />
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

export default CreateVocabulary;
