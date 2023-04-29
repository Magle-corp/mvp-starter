import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from 'primereact/avatar';
import menuAdmin from '@/cdn/conf/menuAdmin';
import menuOrganization from '@/cdn/conf/menuOrganization';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
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
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const { token, logout } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { breakpointSM, breakpointMD } = useBreakpoints();

  const HeaderLeft = (
    <>
      {organization && (
        <>
          {(!sideMenuOpen || !breakpointMD) && (
            <Icon
              size={25}
              pointer={true}
              className="pi pi-bars"
              onClick={() => setSideMenuOpen(!sideMenuOpen)}
            />
          )}
          {sideMenuOpen && breakpointMD && (
            <Icon
              size={25}
              pointer={true}
              className="pi pi-times"
              onClick={() => setSideMenuOpen(!sideMenuOpen)}
            />
          )}
          {breakpointSM && <p>{organization.name}</p>}
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
            onClick={() => setSideBarOpen(!sideBarOpen)}
          />
          <SideBar
            position="right"
            visible={sideBarOpen}
            onHide={() => setSideBarOpen(!sideBarOpen)}
          >
            <Menu model={menuAdmin} />
            <LogoutButton variant="danger" onClick={() => logout()}>
              Deconnexion
            </LogoutButton>
          </SideBar>
        </>
      )}
    </>
  );

  return (
    <BackOffice>
      <BackOfficeHeader headerLeft={HeaderLeft} headerRight={HeaderRight} />
      {organization && (
        <BackOfficeBody>
          {!breakpointMD && (
            <SideBar
              visible={sideMenuOpen}
              onHide={() => setSideMenuOpen(!sideMenuOpen)}
            >
              <Menu model={menuOrganization} />
            </SideBar>
          )}
          {breakpointMD && sideMenuOpen && <Menu model={menuOrganization} />}
          {props.children}
        </BackOfficeBody>
      )}
    </BackOffice>
  );
};

const AdminAvatar = styled(Avatar)`
  cursor: pointer;
`;

const LogoutButton = styled(Button)`
  margin: auto auto;
`;

export default BackOfficeLayout;
