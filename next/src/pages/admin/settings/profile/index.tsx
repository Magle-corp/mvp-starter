import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynUpdatePasswordCard = dynamic(() =>
  import('@/features/profile/templates/UpdatePasswordCard').then(
    (UpdatePasswordCard) => UpdatePasswordCard
  )
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/layouts/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

const DynSettingsLayout = dynamic(() =>
  import('@/ui/layouts/SettingsLayout').then((SettingsLayout) => SettingsLayout)
);

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
        <DynAuthGuard>
          <DynBackOfficeLayout>
            <DynSettingsLayout>{page}</DynSettingsLayout>
          </DynBackOfficeLayout>
        </DynAuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default Profile;