import { ReactElement } from 'react';
import Head from 'next/head';
import { BackOfficeContextWrapper } from '@/cdn/BackOfficeContext';
import {
  AuthContextWrapper,
  useAuthContext,
} from '@/features/authentication/AuthContext';
import CreateOrganizationCard from '@/features/organization/templates/CreateOrganizationCard';
import DeleteOrganizationCard from '@/features/organization/templates/DeleteOrganizationCard';
import UpdateOrganizationCard from '@/features/organization/templates/UpdateOrganizationCard';
import UpdateOrganizationVisibilityCard from '@/features/organization/templates/UpdateOrganizationVisibilityCard';
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
      {!organization && <CreateOrganizationCard />}
      {organization && (
        <>
          <UpdateOrganizationCard />
          <UpdateOrganizationVisibilityCard />
          <DeleteOrganizationCard />
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

export default Organization;
