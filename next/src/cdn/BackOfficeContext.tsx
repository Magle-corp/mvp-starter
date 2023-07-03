import { createContext, ReactNode, useContext } from 'react';
import LocalStorageKeys from '@/cdn/enums/LocalStorageKeys';
import BackOfficeContext from '@/cdn/types/BackOfficeContext';
import useLocalStorage from '@/cdn/hooks/useLocalStorage';

type Props = {
  children: ReactNode;
};

// @ts-ignore
const Context = createContext<BackOfficeContext>();

export function BackOfficeContextWrapper({ children }: Props) {
  const [organizationMenuOpen, setOrganizationMenuOpen] =
    useLocalStorage<boolean>(LocalStorageKeys.BO_ORGANIZATION_MENU, true);

  const sharedStates: BackOfficeContext = {
    organizationMenuOpen,
    setOrganizationMenuOpen,
  };

  return <Context.Provider value={sharedStates}>{children}</Context.Provider>;
}

export function useBackOfficeContext() {
  return useContext(Context);
}
