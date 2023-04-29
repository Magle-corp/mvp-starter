import { ReactNode } from 'react';
import styled from 'styled-components';
import AppPages from '@/cdn/enums/AppPages';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import CreateOrganizationCard from '@/features/organization/templates/CreateOrganizationCard';
import AdminTemplate from '@/ui/organisms/AdminTemplate';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';

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
        <AdminTemplate>
          <CreateOrganizationCard />
        </AdminTemplate>
      )}
      {!unguardedPage && error && !loading && (
        <AdminTemplate>
          <StyledCard title="Oups...">
            <ErrorWrapper>
              <p>
                Une erreur nous empêche de vous donner accès au back-office 🔌
              </p>
              <p>Veuillez nous excuser pour la gêne occasionnée</p>
            </ErrorWrapper>
            <LinksWrapper>
              <Link href={AppPages.AUTH_SIGN_IN}>Se connecter</Link>
            </LinksWrapper>
          </StyledCard>
        </AdminTemplate>
      )}
      {!unguardedPage && loading && (
        <LoadingWrapper>
          <ProgressSpinner />
        </LoadingWrapper>
      )}
    </>
  );
};

const StyledCard = styled(Card)`
  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
  }
`;

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
