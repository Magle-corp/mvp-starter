import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';

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

const DynUpdateOrganizationVisibilityCard = dynamic(() =>
  import(
    '@/features/organization/templates/UpdateOrganizationVisibilityCard'
  ).then((UpdateOrganizationVisibilityCard) => UpdateOrganizationVisibilityCard)
);

const DynBackOfficeLayout = dynamic(() =>
  import('@/ui/layouts/BackOfficeLayout').then(
    (BackOfficeLayout) => BackOfficeLayout
  )
);

const DynSettingsLayout = dynamic(() =>
  import('@/ui/layouts/SettingsLayout').then((SettingsLayout) => SettingsLayout)
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
      <DynUpdateOrganizationVisibilityCard />
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
        </DynAuthGuard>
      </AuthContextWrapper>
    </BackOfficeContextWrapper>
  );
};

export default Organization;
