import { ReactElement } from 'react';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AuthGuard from '@/features/authentication/AuthGuard';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import UpdateAnimalCard from '@/features/animals/templates/UpdateAnimalCard';
import BackOfficeLayout from '@/ui/organisms/BackOfficeLayout';
import ConfirmDialog from '@/ui/atoms/ConfirmDialog';
import Toast from '@/ui/atoms/Toast';

const UpdateAnimal = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Mettre à jour un animal</title>
        <meta
          name="Mettre à jour un animal"
          content="Mettre à jour un animal"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UpdateAnimalCard />
    </>
  );
};

UpdateAnimal.getLayout = function getLayout(page: ReactElement) {
  return (
    <BackOfficeContextWrapper>
      <AuthContextWrapper>
        <AuthGuard>
          <BackOfficeLayout>{page}</BackOfficeLayout>
          <Toast />
          <ConfirmDialog />
        </AuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default UpdateAnimal;
