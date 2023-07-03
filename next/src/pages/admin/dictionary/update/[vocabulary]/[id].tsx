import { ReactElement } from 'react';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import UpdateVocabularyCard from '@/features/dictionary/templates/UpdateVocabularyCard';
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
      <UpdateVocabularyCard />
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

export default UpdateVocabulary;
