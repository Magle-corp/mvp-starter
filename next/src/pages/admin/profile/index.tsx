import { ReactElement } from 'react';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AuthGuard from '@/features/authentication/AuthGuard';
import { OrganizationContextWrapper } from '@/features/organization/OrganizationContext';
import OrganizationGuard from '@/features/organization/OrganizationGuard';
import AdminTemplate from '@/ui/organisms/AdminTemplate';

const Profile = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Profil</title>
        <meta name="Profil" content="Profil" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <></>
    </>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthContextWrapper>
      <AuthGuard>
        <OrganizationContextWrapper>
          <OrganizationGuard>
            <AdminTemplate>{page}</AdminTemplate>
          </OrganizationGuard>
        </OrganizationContextWrapper>
      </AuthGuard>
    </AuthContextWrapper>
  );
};

export default Profile;
