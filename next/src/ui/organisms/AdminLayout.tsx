import { ReactNode, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import menuAdmin from '@/cdn/conf/menuAdmin';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import Admin from '@/ui/atoms/layout/Admin';
import AdminHeader from '@/ui/atoms/layout/AdminHeader';
import AdminBody from '@/ui/atoms/layout/AdminBody';
import Menu from '@/ui/atoms/Menu';
import Sidebar from '@/ui/atoms/SideBar';
import Icon from '@/ui/atoms/Icon';

type AdminLayout = {
  children: ReactNode;
};

const AdminLayout = (props: AdminLayout) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const { breakpointSM, breakpointMD } = useBreakpoints();

  const HeaderLeft = (
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
      {breakpointSM && <p>La maison des chats</p>}
    </>
  );

  const HeaderRight = <Avatar shape="circle" />;

  return (
    <Admin>
      <AdminHeader headerLeft={HeaderLeft} headerRight={HeaderRight} />
      <AdminBody>
        {!breakpointMD && (
          <Sidebar
            visible={sideMenuOpen}
            onHide={() => setSideMenuOpen(!sideMenuOpen)}
          >
            <Menu model={menuAdmin} />
          </Sidebar>
        )}
        {breakpointMD && sideMenuOpen && <Menu model={menuAdmin} />}
        {props.children}
      </AdminBody>
    </Admin>
  );
};

export default AdminLayout;
