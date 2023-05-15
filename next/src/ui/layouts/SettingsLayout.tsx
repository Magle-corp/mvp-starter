import { ReactNode } from 'react';
import styled from 'styled-components';
import menuSettings from '@/cdn/conf/menuSettings';
import TabMenu from '@/ui/atoms/TabMenu';

type SettingsLayout = {
  children: ReactNode;
};

const SettingsLayout = (props: SettingsLayout) => {
  return (
    <>
      <TabMenu model={menuSettings} />
      <StyledMain>{props.children}</StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default SettingsLayout;
