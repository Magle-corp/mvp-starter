import { ReactNode } from 'react';
import styled from 'styled-components';
import AppPages from '@/cdn/enums/AppPages';
import NoOrganizationTemplate from '@/features/organization/templates/NoOrganizationTemplate';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import AdminTemplate from '@/ui/organisms/AdminTemplate';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';

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
          <Card title="🔌 Oups...">
            <ErrorWrapper>
              <p>Une erreur nous empêche de vous donner accès au back-office</p>
              <p>Veuillez nous excuser pour la gêne occasionnée</p>
            </ErrorWrapper>
            <LinksWrapper>
              <Link href={AppPages.AUTH_SIGN_IN}>Se connecter</Link>
            </LinksWrapper>
          </Card>
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

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;

  p:first-child {
    font-weight: 600;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  a {
    font-weight: 600;
  }
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default OrganizationGuard;
