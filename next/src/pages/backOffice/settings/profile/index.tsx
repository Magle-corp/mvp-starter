import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynUpdatePasswordCard = dynamic(() =>
  import('@/features/profile/templates/UpdatePasswordCard').then(
    (UpdatePasswordCard) => UpdatePasswordCard
  )
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/organisms/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

const DynSettingsLayout = dynamic(() =>
  import('@/ui/organisms/SettingsLayout').then(
    (SettingsLayout) => SettingsLayout
  )
);

const DynConfirmDialog = dynamic(() =>
  import('@/ui/atoms/ConfirmDialog').then((ConfirmDialog) => ConfirmDialog)
);

const DynToast = dynamic(() =>
  import('@/ui/atoms/Toast').then((Toast) => Toast)
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
          <DynToast />
          <DynConfirmDialog />
        </DynAuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default Profile;
