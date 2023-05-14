import { ReactElement } from 'react';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AuthGuard from '@/features/authentication/AuthGuard';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { OrganizationContextWrapper } from '@/features/organization/OrganizationContext';
import OrganizationGuard from '@/features/organization/OrganizationGuard';
import UpdateVocabularyCard from '@/features/dictionary/templates/UpdateVocabularyCard';
import BackOfficeLayout from '@/ui/organisms/BackOfficeLayout';
import ConfirmDialog from '@/ui/atoms/ConfirmDialog';
import Toast from '@/ui/atoms/Toast';

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
      <UpdateVocabularyCard />
    </>
  );
};

UpdateVocabulary.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextWrapper>
      <AuthGuard>
        <BackOfficeContextWrapper>
          <OrganizationContextWrapper>
            <OrganizationGuard>
              <BackOfficeLayout>{page}</BackOfficeLayout>
              <Toast />
              <ConfirmDialog />
            </OrganizationGuard>
          </OrganizationContextWrapper>
        </BackOfficeContextWrapper>
      </AuthGuard>
    </AuthContextWrapper>
  );
};

export default UpdateVocabulary;
