import { useState } from 'react';
import styled from 'styled-components';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import menuAdmin from '@/cdn/conf/menuAdmin';
import authService from '@/features/authentication/utils/AuthService';
import Button from '@/ui/atoms/Button';
import Menu from '@/ui/atoms/Menu';

const BackOfficeHeaderRight = () => {
  const [adminMenuOpen, setAdminMenuOpen] = useState<boolean>(false);

  return (
    <Wrapper>
      <Avatar
        icon="pi pi-user"
        shape="circle"
        onClick={() => setAdminMenuOpen(!adminMenuOpen)}
      />
      <StyledSidebar
        position="right"
        visible={adminMenuOpen}
        onHide={() => setAdminMenuOpen(!adminMenuOpen)}
      >
        <Menu model={menuAdmin} />
        <LogoutButton
          label="Deconnexion"
          variant="danger"
          onClick={() => authService.logout()}
          size="small"
        />
      </StyledSidebar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledSidebar = styled(Sidebar)`
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

const LogoutButton = styled(Button)`
  margin: auto auto 0 auto;
`;

export default BackOfficeHeaderRight;
