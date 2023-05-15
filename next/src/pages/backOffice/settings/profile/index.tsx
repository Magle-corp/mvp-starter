import { ReactElement } from 'react';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AuthGuard from '@/features/authentication/AuthGuard';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import UpdatePasswordCard from '@/features/profile/templates/UpdatePasswordCard';
import BackOfficeLayout from '@/ui/organisms/BackOfficeLayout';
import SettingsLayout from '@/ui/organisms/SettingsLayout';
import ConfirmDialog from '@/ui/atoms/ConfirmDialog';
import Toast from '@/ui/atoms/Toast';

const Profile = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Profil</title>
        <meta name="Profil" content="Profil" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UpdatePasswordCard />
    </>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
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

export default Profile;
