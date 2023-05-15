import { ReactElement } from 'react';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AuthGuard from '@/features/authentication/AuthGuard';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import CreateVocabularyCard from '@/features/dictionary/templates/CreateVocabularyCard';
import BackOfficeLayout from '@/ui/organisms/BackOfficeLayout';
import ConfirmDialog from '@/ui/atoms/ConfirmDialog';
import Toast from '@/ui/atoms/Toast';

const CreateVocabulary = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Créer vocabulaire</title>
        <meta name="Créer vocabulaire" content="Créer vocabulaire" />
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
        <AuthGuard>
          <BackOfficeLayout>{page}</BackOfficeLayout>
          <Toast />
          <ConfirmDialog />
        </AuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default CreateVocabulary;
