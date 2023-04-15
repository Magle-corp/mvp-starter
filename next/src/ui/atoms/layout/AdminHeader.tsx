import { ReactNode } from 'react';
import styled from 'styled-components';

type AdminHeader = {
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
};

const AdminHeader = (props: AdminHeader) => {
  return (
    <Header>
      <HeaderLeft>{props.headerLeft}</HeaderLeft>
      <HeaderRight>{props.headerRight}</HeaderRight>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const HeaderRight = styled(HeaderLeft)`
  margin-left: auto;
`;

export default AdminHeader;
