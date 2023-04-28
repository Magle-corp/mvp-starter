import { ReactNode, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import menuAdmin from '@/cdn/conf/menuAdmin';
import menuOrganization from '@/cdn/conf/menuOrganization';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import Admin from '@/ui/atoms/layout/Admin';
import AdminHeader from '@/ui/atoms/layout/AdminHeader';
import AdminBody from '@/ui/atoms/layout/AdminBody';
import Menu from '@/ui/atoms/Menu';
import Icon from '@/ui/atoms/Icon';
import Button from '@/ui/atoms/Button';
import styled from 'styled-components';

type AdminTemplate = {
  children: ReactNode;
};

const AdminTemplate = (props: AdminTemplate) => {
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
          <AdminMenu
            position="right"
            visible={sideBarOpen}
            onHide={() => setSideBarOpen(!sideBarOpen)}
          >
            <Menu model={menuAdmin} />
            <Button variant="danger" onClick={() => logout()}>
              Deconnexion
            </Button>
          </AdminMenu>
        </>
      )}
    </>
  );

  return (
    <Admin>
      <AdminHeader headerLeft={HeaderLeft} headerRight={HeaderRight} />
      {organization && (
        <AdminBody>
          {!breakpointMD && (
            <OrganizationMenu
              visible={sideMenuOpen}
              onHide={() => setSideMenuOpen(!sideMenuOpen)}
            >
              <Menu model={menuOrganization} />
            </OrganizationMenu>
          )}
          {breakpointMD && sideMenuOpen && <Menu model={menuOrganization} />}
        </AdminBody>
      )}
      {props.children}
    </Admin>
  );
};

const SideMenu = styled(Sidebar)`
  width: max-content !important;

  .p-sidebar-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-right: 0;
    padding-left: 0;
  }

  .p-menu {
    box-shadow: unset;
  }
`;

const OrganizationMenu = styled(SideMenu)``;

const AdminAvatar = styled(Avatar)`
  cursor: pointer;
`;

const AdminMenu = styled(SideMenu)`
  .p-sidebar-content {
    padding-top: 5px !important;

    ${Button} {
      margin: auto auto;
    }
  }
`;

export default AdminTemplate;
