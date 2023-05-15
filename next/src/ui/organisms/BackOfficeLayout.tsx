import { ReactNode } from 'react';
import styled from 'styled-components';
import { Avatar } from 'primereact/avatar';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import menuAdmin from '@/cdn/conf/menuAdmin';
import menuOrganization from '@/cdn/conf/menuOrganization';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import { useAuthContext } from '@/features/authentication/AuthContext';
import BackOffice from '@/ui/atoms/layout/BackOffice';
import BackOfficeBody from '@/ui/atoms/layout/BackOfficeBody';
import BackOfficeHeader from '@/ui/atoms/layout/BackOfficeHeader';
import Menu from '@/ui/atoms/Menu';
import Icon from '@/ui/atoms/Icon';
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

  const HeaderLeft = (
    <>
      {organization && (
        <>
          {(!organizationMenuOpen || !breakpointMD) && (
            <Icon
              size={20}
              pointer={true}
              className="pi pi-bars"
              onClick={() => setOrganizationMenuOpen(!organizationMenuOpen)}
            />
          )}
          {organizationMenuOpen && breakpointMD && (
            <Icon
              size={20}
              pointer={true}
              className="pi pi-times"
              onClick={() => setOrganizationMenuOpen(!organizationMenuOpen)}
            />
          )}
          {breakpointSM && (
            <OrganizationName>{organization.name}</OrganizationName>
          )}
        </>
      )}
    </>
  );

  const HeaderRight = (
    <>
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
    </>
  );

  return (
    <BackOffice>
      <BackOfficeHeader headerLeft={HeaderLeft} headerRight={HeaderRight} />
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

export default BackOfficeLayout;
