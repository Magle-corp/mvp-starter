import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/layouts/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

const DynConfirmDialog = dynamic(() =>
  import('@/ui/atoms/ConfirmDialog').then((ConfirmDialog) => ConfirmDialog)
);

const DynToast = dynamic(() =>
  import('@/ui/atoms/Toast').then((Toast) => Toast)
);

const Dashboard = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Tableau de bord</title>
        <meta name="Tableau de bord" content="Tableau de bord" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <></>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <BackOfficeContextWrapper>
      <AuthContextWrapper>
        <DynAuthGuard>
          <DynBackOfficeLayout>{page}</DynBackOfficeLayout>
          <DynToast />
          <DynConfirmDialog />
        </DynAuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default Dashboard;
