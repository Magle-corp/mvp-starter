import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { TabMenu as PTabMenu, TabMenuProps } from 'primereact/tabmenu';
import { MenuItem, MenuItemOptions } from 'primereact/menuitem';

const TabMenuNextLinkTemplate = (item: MenuItem, options: MenuItemOptions) => (
  <Link href={item.url as string} className={options.className}>
    <span>
      <i className={options.iconClassName} />
    </span>
    {item.label}
  </Link>
);

const TabMenu = (props: TabMenuProps) => {
  const [activeTab, setActiveTab] = useState<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    props.model?.map((menuItem, index) => {
      if (router.pathname === menuItem.url) {
        setActiveTab(index);
      }
    });
  }, [props, router]);

  const templatedMenu = props.model?.map((menuItem) => {
    return {
      ...menuItem,
      template: (item: MenuItem, options: MenuItemOptions) =>
        TabMenuNextLinkTemplate(item, options),
    };
  });

  return (
    <StyledTabMenu
      {...props}
      model={templatedMenu}
      activeIndex={activeTab}
      onTabChange={(e) => setActiveTab(e.index)}
    />
  );
};

const StyledTabMenu = styled(PTabMenu)`
  width: 100%;
  height: max-content;
  border-radius: 3px;

  .p-tabmenu-nav {
    * {
      font-weight: normal !important;
    }
  }
`;

export default TabMenu;
