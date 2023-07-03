import { ReactElement } from 'react';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import UpdatePasswordCard from '@/features/profile/templates/UpdatePasswordCard';
import BackOfficeLayout from '@/ui/layouts/BackOfficeLayout';
import SettingsLayout from '@/ui/layouts/SettingsLayout';

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
        <BackOfficeLayout>
          <SettingsLayout>{page}</SettingsLayout>
        </BackOfficeLayout>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default Profile;
