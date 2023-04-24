import { ReactNode, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import menuAdmin from '@/cdn/conf/menuAdmin';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import Admin from '@/ui/atoms/layout/Admin';
import AdminHeader from '@/ui/atoms/layout/AdminHeader';
import AdminBody from '@/ui/atoms/layout/AdminBody';
import Menu from '@/ui/atoms/Menu';
import Sidebar from '@/ui/atoms/SideBar';
import Icon from '@/ui/atoms/Icon';

type AdminTemplate = {
  children: ReactNode;
};

const AdminTemplate = (props: AdminTemplate) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
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

  const HeaderRight = <Avatar icon="pi pi-user" shape="circle" />;

  return (
    <Admin>
      <AdminHeader headerLeft={HeaderLeft} headerRight={HeaderRight} />
      <AdminBody>
        {organization && (
          <>
            {!breakpointMD && (
              <Sidebar
                visible={sideMenuOpen}
                onHide={() => setSideMenuOpen(!sideMenuOpen)}
              >
                <Menu model={menuAdmin} />
              </Sidebar>
            )}
            {breakpointMD && sideMenuOpen && <Menu model={menuAdmin} />}
          </>
        )}
        {props.children}
      </AdminBody>
    </Admin>
  );
};

export default AdminTemplate;
