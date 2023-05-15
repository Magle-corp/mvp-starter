import { ReactElement } from 'react';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AuthGuard from '@/features/authentication/AuthGuard';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import UpdateOrganizationCard from '@/features/organization/templates/UpdateOrganizationCard';
import DeleteOrganizationCard from '@/features/organization/templates/DeleteOrganizationCard';
import BackOfficeLayout from '@/ui/organisms/BackOfficeLayout';
import SettingsLayout from '@/ui/organisms/SettingsLayout';
import ConfirmDialog from '@/ui/atoms/ConfirmDialog';
import Toast from '@/ui/atoms/Toast';

const Organization = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Organisation</title>
        <meta name="Organisation" content="Organisation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UpdateOrganizationCard />
      <DeleteOrganizationCard />
    </>
  );
};

Organization.getLayout = function getLayout(page: ReactElement) {
  return (
    <BackOfficeContextWrapper>
      <AuthContextWrapper>
        <AuthGuard>
          <BackOfficeLayout>
            <SettingsLayout>{page}</SettingsLayout>
          </BackOfficeLayout>
          <Toast />
          <ConfirmDialog />
        </AuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default Organization;
