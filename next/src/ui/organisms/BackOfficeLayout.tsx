import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from 'primereact/avatar';
import LocalStorageKeys from '@/cdn/enums/LocalStorageKeys';
import menuAdmin from '@/cdn/conf/menuAdmin';
import menuOrganization from '@/cdn/conf/menuOrganization';
import useLocalStorage from '@/cdn/hooks/useLocalStorage';
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
  const [adminMenuOpen, setAdminMenuOpen] = useState<boolean>(false);
  const [organizationMenuOpen, setOrganizationMenuOpen] =
    useLocalStorage<boolean>(LocalStorageKeys.BO_ORGANIZATION_MENU, false);
  const { token, logout } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { breakpointSM, breakpointMD } = useBreakpoints();

  const HeaderLeft = (
    <>
      {organization && (
        <>
          {(!organizationMenuOpen || !breakpointMD) && (
            <Icon
              size={25}
              pointer={true}
              className="pi pi-bars"
              onClick={() => setOrganizationMenuOpen(!organizationMenuOpen)}
            />
          )}
          {organizationMenuOpen && breakpointMD && (
            <Icon
              size={25}
              pointer={true}
              className="pi pi-times"
              onClick={() => setOrganizationMenuOpen(!organizationMenuOpen)}
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
            onClick={() => setAdminMenuOpen(!adminMenuOpen)}
          />
          <SideBar
            position="right"
            visible={adminMenuOpen}
            onHide={() => setAdminMenuOpen(!adminMenuOpen)}
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
              <Menu model={menuOrganization} />
            )}
          </>
        )}
        {props.children}
      </BackOfficeBody>
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
