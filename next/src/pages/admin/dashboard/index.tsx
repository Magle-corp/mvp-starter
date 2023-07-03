import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import BackOfficeLayout from '@/ui/layouts/BackOfficeLayout';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
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
          <BackOfficeLayout>{page}</BackOfficeLayout>
        </DynAuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default Dashboard;
