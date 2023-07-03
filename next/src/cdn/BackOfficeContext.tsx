import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
} from 'react';
import LocalStorageKeys from '@/cdn/enums/LocalStorageKeys';
import useLocalStorage from '@/cdn/hooks/useLocalStorage';

type BackOfficeContext = {
  organizationMenuOpen: boolean;
  setOrganizationMenuOpen: Function;
  toast: MutableRefObject<any>;
};

type Props = {
  children: ReactNode;
};

// @ts-ignore
const Context = createContext<BackOfficeContext>();

export function BackOfficeContextWrapper({ children }: Props) {
  const [organizationMenuOpen, setOrganizationMenuOpen] =
    useLocalStorage<boolean>(LocalStorageKeys.BO_ORGANIZATION_MENU, true);

  const toast = useRef(null);

  const sharedStates: BackOfficeContext = {
    organizationMenuOpen,
    setOrganizationMenuOpen,
    toast,
  };

  return <Context.Provider value={sharedStates}>{children}</Context.Provider>;
}

export function useBackOfficeContext() {
  return useContext(Context);
}
