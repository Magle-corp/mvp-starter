import Head from 'next/head';
import AdminLayout from '@/ui/organisms/AdminLayout';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Tableau de bord</title>
        <meta name="Tableau de bord" content="Tableau de bord" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <></>
      </AdminLayout>
    </>
  );
}
