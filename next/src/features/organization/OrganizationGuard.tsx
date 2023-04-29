import { ReactNode } from 'react';
import styled from 'styled-components';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import CreateOrganizationCard from '@/features/organization/templates/CreateOrganizationCard';
import ErrorGetOrganizationCard from '@/features/organization/templates/ErrorGetOrganizationCard';
import BackOfficeLayout from '@/ui/organisms/BackOfficeLayout';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';

type OrganizationGuard = {
  children: ReactNode;
};

const OrganizationGuard = (props: OrganizationGuard) => {
  const { unguardedPage, organization, loading, error } =
    useOrganizationContext();

  return (
    <>
      {unguardedPage && <>{props.children}</>}
      {!unguardedPage && !error && !loading && organization && (
        <>{props.children}</>
      )}
      {!unguardedPage && !error && !loading && !organization && (
        <BackOfficeLayout>
          <main>
            <CreateOrganizationCard />
          </main>
        </BackOfficeLayout>
      )}
      {!unguardedPage && error && !loading && (
        <BackOfficeLayout>
          <main>
            <ErrorGetOrganizationCard />
          </main>
        </BackOfficeLayout>
      )}
      {!unguardedPage && loading && (
        <LoadingWrapper>
          <ProgressSpinner />
        </LoadingWrapper>
      )}
    </>
  );
};

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default OrganizationGuard;
