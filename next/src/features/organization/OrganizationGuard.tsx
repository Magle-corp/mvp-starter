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
  const { organization, loading } = useOrganizationContext();

  return (
    <>
      {!loading && organization && <>{props.children}</>}
      {!loading && !organization && (
        <AdminTemplate>
          <NoOrganizationTemplate />
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
