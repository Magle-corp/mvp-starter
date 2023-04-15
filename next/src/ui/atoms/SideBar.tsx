import styled from 'styled-components';
import { Sidebar } from 'primereact/sidebar';

export default styled(Sidebar)`
  width: max-content !important;

  .p-sidebar-content {
    padding-right: 0;
    padding-left: 0;
  }

  .p-menu {
    box-shadow: unset;
  }
`;
