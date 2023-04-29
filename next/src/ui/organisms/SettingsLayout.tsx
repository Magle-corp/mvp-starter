import { ReactNode } from 'react';
import menuSettings from '@/cdn/conf/menuSettings';
import TabMenu from '@/ui/atoms/TabMenu';

type SettingsLayout = {
  children: ReactNode;
};

const SettingsLayout = (props: SettingsLayout) => {
  return (
    <>
      <TabMenu model={menuSettings} />
      {props.children}
    </>
  );
};

export default SettingsLayout;
