import { ReactNode } from 'react';
import styled from 'styled-components';
import { Avatar } from 'primereact/avatar';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import menuAdmin from '@/cdn/conf/menuAdmin';
import menuOrganization from '@/cdn/conf/menuOrganization';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import { useAuthContext } from '@/features/authentication/AuthContext';
import Menu from '@/ui/atoms/Menu';
import Button from '@/ui/atoms/Button';
import SideBar from '@/ui/atoms/SideBar';

type BackOfficeLayout = {
  children: ReactNode;
};

const BackOfficeLayout = (props: BackOfficeLayout) => {
  const { token, logout, organization } = useAuthContext();
  const {
    adminMenuOpen,
    setAdminMenuOpen,
    organizationMenuOpen,
    setOrganizationMenuOpen,
  } = useBackOfficeContext();
  const { breakpointSM, breakpointMD } = useBreakpoints();

  const HeaderLeft = () => (
    <>
      {organization && (
        <HeaderLeftWrapper>
          {(!organizationMenuOpen || !breakpointMD) && (
            <Icon
              className="pi pi-bars"
              onClick={() => setOrganizationMenuOpen(!organizationMenuOpen)}
            />
          )}
          {organizationMenuOpen && breakpointMD && (
            <Icon
              className="pi pi-times"
              onClick={() => setOrganizationMenuOpen(!organizationMenuOpen)}
            />
          )}
          {breakpointSM && (
            <OrganizationName>{organization.name}</OrganizationName>
          )}
        </HeaderLeftWrapper>
      )}
    </>
  );

  const HeaderRight = () => (
    <HeaderRightWrapper>
      {token && (
        <>
          <AdminAvatar
            icon="pi pi-user"
            shape="circle"
            onClick={() => setAdminMenuOpen(!adminMenuOpen)}
          />
          <SideBar
            position="right"
            visible={adminMenuOpen}
            onHide={() => setAdminMenuOpen(!adminMenuOpen)}
          >
            <Menu model={menuAdmin} />
            <LogoutButton
              label="Deconnexion"
              variant="danger"
              onClick={() => logout()}
              size="small"
            />
          </SideBar>
        </>
      )}
    </HeaderRightWrapper>
  );

  return (
    <BackOffice>
      <Header>
        <HeaderLeft />
        <HeaderRight />
      </Header>
      <BackOfficeBody>
        {organization && (
          <>
            {!breakpointMD && (
              <SideBar
                visible={organizationMenuOpen}
                onHide={() => setOrganizationMenuOpen(!organizationMenuOpen)}
              >
                <Menu model={menuOrganization} />
              </SideBar>
            )}
            {breakpointMD && organizationMenuOpen && (
              <StyledMenu model={menuOrganization} />
            )}
          </>
        )}
        <BodyItemsWrapper>{props.children}</BodyItemsWrapper>
      </BackOfficeBody>
    </BackOffice>
  );
};

const BackOffice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

const BackOfficeBody = styled.div`
  display: flex;
  gap: 1.5rem;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
`;

const HeaderLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderRightWrapper = styled(HeaderLeftWrapper)`
  margin-left: auto;
`;

const OrganizationName = styled.p`
  font-weight: 700;
`;

const AdminAvatar = styled(Avatar)`
  cursor: pointer;
`;

const StyledMenu = styled(Menu)`
  min-height: 90vh;
`;

const LogoutButton = styled(Button)`
  margin: auto auto 0 auto;
`;

const BodyItemsWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const Icon = styled.i`
  font-size: 20px;
  cursor: pointer;
`;

export default BackOfficeLayout;
