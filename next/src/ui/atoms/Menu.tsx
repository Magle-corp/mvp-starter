import Link from 'next/link';
import styled from 'styled-components';
import { Menu as PMenu, MenuProps } from 'primereact/menu';
import { MenuItem, MenuItemOptions } from 'primereact/menuitem';

const MenuNextLinkTemplate = (item: MenuItem, options: MenuItemOptions) => (
  <Link href={item.url as string} className={options.className}>
    <span>
      <i className={options.iconClassName} />
    </span>
    {item.label}
  </Link>
);

const Menu = (props: MenuProps) => {
  const templatedMenu = props.model?.map((menuItem) => {
    return {
      ...menuItem,
      template: (item: MenuItem, options: MenuItemOptions) =>
        MenuNextLinkTemplate(item, options),
    };
  });

  return <StyledMenu {...props} model={templatedMenu} />;
};

const StyledMenu = styled(PMenu)`
  flex-shrink: 0;
  padding: 0;
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
`;

export default Menu;
