import { ReactNode } from 'react';
import styled from 'styled-components';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import { useAuthContext } from '@/features/authentication/AuthContext';
import BackOfficeHeaderLeft from '@/ui/layouts/components/BackOfficeHeaderLeft';
import BackOfficeHeaderRight from '@/ui/layouts/components/BackOfficeHeaderRight';
import BackOfficeMenuLeft from '@/ui/layouts/components/BackOfficeMenuLeft';

type BackOfficeLayout = {
  children: ReactNode;
};

const BackOfficeLayout = (props: BackOfficeLayout) => {
  const { organization } = useAuthContext();
  const { organizationMenuOpen, setOrganizationMenuOpen } =
    useBackOfficeContext();

  return (
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
        <Cards>{props.children}</Cards>
      </Body>
    </Layout>
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
  justify-content: space-between;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  gap: 1.5rem;
  height: 100%;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export default BackOfficeLayout;
