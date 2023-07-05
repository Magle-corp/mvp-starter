import { ReactElement } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
  AuthContextWrapper,
  useAuthContext,
} from '@/features/authentication/AuthContext';
import { BackOfficeContextWrapper } from '@/ui/layouts/BackOfficeContext';
import BackOfficeLayout from '@/ui/layouts/BackOfficeLayout';
import SettingsLayout from '@/ui/layouts/SettingsLayout';

const Organization = (): JSX.Element => {
  const { organization } = useAuthContext();

  return (
    <>
      <Head>
        <title>Organisation</title>
        <meta name="Organisation" content="Organisation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {organization && (
        <>
          <DynUpdateOrganizationCard />
          <DynUpdateOrganizationVisibilityCard />
          <DynDeleteOrganizationCard />
        </>
      )}
    </>
  );
};

Organization.getLayout = function getLayout(page: ReactElement) {
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

const DynDeleteOrganizationCard = dynamic(() =>
  import('@/features/organization/templates/DeleteOrganizationCard').then(
    (DeleteOrganizationCard) => DeleteOrganizationCard
  )
);

const DynUpdateOrganizationCard = dynamic(() =>
  import('@/features/organization/templates/UpdateOrganizationCard').then(
    (UpdateOrganizationCard) => UpdateOrganizationCard
  )
);

const DynUpdateOrganizationVisibilityCard = dynamic(() =>
  import(
    '@/features/organization/templates/UpdateOrganizationVisibilityCard'
  ).then((UpdateOrganizationVisibilityCard) => UpdateOrganizationVisibilityCard)
);

export default Organization;
