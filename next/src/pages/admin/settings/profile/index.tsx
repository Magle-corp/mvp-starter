import { ReactElement } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/ui/layouts/BackOfficeContext';
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
      <DynUpdatePasswordCard />
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

const DynUpdatePasswordCard = dynamic(() =>
  import('@/features/profile/templates/UpdatePasswordCard').then(
    (UpdatePasswordCard) => UpdatePasswordCard
  )
);

export default Profile;
