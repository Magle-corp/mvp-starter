import { ReactNode } from 'react';
import styled from 'styled-components';
import NoOrganizationTemplate from '@/features/organization/templates/NoOrganizationTemplate';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import AdminTemplate from '@/ui/organisms/AdminTemplate';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';

type OrganizationGuard = {
  children: ReactNode;
};

const OrganizationGuard = (props: OrganizationGuard) => {
  const { organization, loading, error } = useOrganizationContext();

  return (
    <>
      {!error && !loading && organization && <>{props.children}</>}
      {!error && !loading && !organization && (
        <AdminTemplate>
          <NoOrganizationTemplate />
        </AdminTemplate>
      )}
      {error && !loading && (
        <AdminTemplate>
          <></>
        </AdminTemplate>
      )}
      {loading && (
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
