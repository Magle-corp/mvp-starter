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
      <Cards>{props.children}</Cards>
    </>
  );
};

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default SettingsLayout;
