import { MutableRefObject } from 'react';

type BackOfficeContext = {
  adminMenuOpen: boolean;
  setAdminMenuOpen: Function;
  organizationMenuOpen: boolean;
  setOrganizationMenuOpen: Function;
  toast: MutableRefObject<any>;
};

export default BackOfficeContext;
