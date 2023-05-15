import { ReactElement } from 'react';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AuthGuard from '@/features/authentication/AuthGuard';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import VocabularyTableCard from '@/features/dictionary/templates/VocabularyTableCard';
import BackOfficeLayout from '@/ui/organisms/BackOfficeLayout';
import ConfirmDialog from '@/ui/atoms/ConfirmDialog';
import Toast from '@/ui/atoms/Toast';

const Dictionary = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Dictionnaire</title>
        <meta name="Dictionnaire" content="Dictionnaire" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VocabularyTableCard />
    </>
  );
};

Dictionary.getLayout = function getLayout(page: ReactElement) {
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

export default Dictionary;
