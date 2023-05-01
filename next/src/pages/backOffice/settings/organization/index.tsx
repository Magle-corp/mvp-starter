import { ReactElement } from 'react';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AuthGuard from '@/features/authentication/AuthGuard';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { OrganizationContextWrapper } from '@/features/organization/OrganizationContext';
import OrganizationGuard from '@/features/organization/OrganizationGuard';
import UpdateOrganizationCard from '@/features/organization/templates/UpdateOrganizationCard';
import BackOfficeLayout from '@/ui/organisms/BackOfficeLayout';
import SettingsLayout from '@/ui/organisms/SettingsLayout';
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
    </>
  );
};

Organization.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextWrapper>
      <AuthGuard>
        <BackOfficeContextWrapper>
          <OrganizationContextWrapper>
            <OrganizationGuard>
              <BackOfficeLayout>
                <SettingsLayout>{page}</SettingsLayout>
              </BackOfficeLayout>
              <Toast />
            </OrganizationGuard>
          </OrganizationContextWrapper>
        </BackOfficeContextWrapper>
      </AuthGuard>
    </AuthContextWrapper>
  );
};

export default Organization;
