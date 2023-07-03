import { ReactNode } from 'react';
import styled from 'styled-components';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';
import { useAuthContext } from '@/features/authentication/AuthContext';
import BackOfficeHeaderLeft from '@/ui/layouts/components/BackOfficeHeaderLeft';
import BackOfficeHeaderRight from '@/ui/layouts/components/BackOfficeHeaderRight';
import BackOfficeMenuLeft from '@/ui/layouts/components/BackOfficeMenuLeft';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';
import Toast from '@/ui/atoms/Toast';

type BackOfficeLayout = {
  children: ReactNode;
};

const BackOfficeLayout = (props: BackOfficeLayout) => {
  const { loading, token, organization } = useAuthContext();
  const { organizationMenuOpen, setOrganizationMenuOpen } =
    useBackOfficeContext();

  return (
    <>
      <Toast />
      {loading && (
        <LoadingWrapper>
          <ProgressSpinner />
        </LoadingWrapper>
      )}
      {!loading && token && (
        <Layout>
          <Header>
            {organization && (
              <BackOfficeHeaderLeft
                organizationName={organization.name}
                organizationMenuOpen={organizationMenuOpen}
                setOrganizationMenuOpen={setOrganizationMenuOpen}
              />
            )}
            <BackOfficeHeaderRight />
          </Header>
          <Body>
            {organization && organizationMenuOpen && <BackOfficeMenuLeft />}
            <Main>{props.children}</Main>
          </Body>
        </Layout>
      )}
    </>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
`;

const Body = styled.div`
  display: flex;
  gap: 1.5rem;
  height: 100%;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default BackOfficeLayout;
