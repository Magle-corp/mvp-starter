import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';

const DynAuthGuard = dynamic(() =>
  import('@/features/authentication/AuthGuard').then((AuthGuard) => AuthGuard)
);

const DynUpdateOrganizationCard = dynamic(() =>
  import('@/features/organization/templates/UpdateOrganizationCard').then(
    (UpdateOrganizationCard) => UpdateOrganizationCard
  )
);

const DynDeleteOrganizationCard = dynamic(() =>
  import('@/features/organization/templates/DeleteOrganizationCard').then(
    (DeleteOrganizationCard) => DeleteOrganizationCard
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

const Organization = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Organisation</title>
        <meta name="Organisation" content="Organisation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynUpdateOrganizationCard />
      <DynDeleteOrganizationCard />
    </>
  );
};

Organization.getLayout = function getLayout(page: ReactElement) {
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

export default Organization;
