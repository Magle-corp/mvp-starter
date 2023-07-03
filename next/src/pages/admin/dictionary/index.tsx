import { ReactElement } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/ui/layouts/BackOfficeContext';
import BackOfficeLayout from '@/ui/layouts/BackOfficeLayout';

const Dictionary = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Dictionnaire</title>
        <meta name="Dictionnaire" content="Dictionnaire" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynVocabularyTableCard />
    </>
  );
};

Dictionary.getLayout = function getLayout(page: ReactElement) {
  return (
    <BackOfficeContextWrapper>
      <AuthContextWrapper>
        <BackOfficeLayout>{page}</BackOfficeLayout>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

const DynVocabularyTableCard = dynamic(() =>
  import('@/features/dictionary/templates/VocabularyTableCard').then(
    (VocabularyTableCard) => VocabularyTableCard
  )
);

export default Dictionary;
