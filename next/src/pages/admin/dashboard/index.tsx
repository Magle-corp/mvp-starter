import { ReactElement } from 'react';
import Head from 'next/head';
import AdminLayout from '@/cdn/layouts/AdminLayout';
import AdminTemplate from '@/ui/organisms/AdminTemplate';

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
    <AdminLayout>
      <AdminTemplate>{page}</AdminTemplate>
    </AdminLayout>
  );
};

export default Dashboard;
