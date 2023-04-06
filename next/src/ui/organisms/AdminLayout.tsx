import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { Sidebar } from 'primereact/sidebar';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import Icon from '@/ui/atoms/Icon';

type AdminLayout = {
  children: ReactNode;
};

const AdminLayout = (props: AdminLayout) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);

  const { breakpointSM, breakpointMD } = useBreakpoints();

  const SideMenuItems = [
    { label: 'Accueil', icon: 'pi pi-home', url: '/dashboard' },
    {
      label: 'Animaux',
      icon: 'pi pi-table',
    },
  ];

  return (
    <Grid>
      <Header>
        <HeaderLeft>
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
        </HeaderLeft>
        <HeaderRight>
          {!breakpointMD && (
            <Icon pointer={true} size={20} className="pi pi-search" />
          )}
          {breakpointMD && <InputText />}
          <Avatar shape="circle" />
        </HeaderRight>
      </Header>
      <Body>
        {!breakpointMD && (
          <StyledSideBar
            visible={sideMenuOpen}
            onHide={() => setSideMenuOpen(!sideMenuOpen)}
          >
            <StyledMenu model={SideMenuItems} />
          </StyledSideBar>
        )}
        {breakpointMD && sideMenuOpen && (
          <div>
            <StyledMenu model={SideMenuItems} />
          </div>
        )}
        {props.children}
      </Body>
    </Grid>
  );
};

const Grid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    font-weight: 600;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  input {
    height: 32px;
    border-radius: 3px;
  }
`;

const Body = styled.div`
  display: flex;
  gap: 1.5rem;
  height: 100%;
`;

const StyledMenu = styled(Menu)`
  height: 100%;
  padding: 0;
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
`;

const StyledSideBar = styled(Sidebar)`
  width: max-content !important;

  .p-sidebar-content {
    padding-right: 0;
    padding-left: 0;
  }

  ${StyledMenu} {
    box-shadow: unset;
  }
`;

export default AdminLayout;
