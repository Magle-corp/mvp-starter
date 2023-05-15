import { createContext, ReactNode, useContext, useRef } from 'react';
import AppContext from '@/cdn/types/AppContext';

type Props = {
  children: ReactNode;
};

// @ts-ignore
const Context = createContext<AppContext>();

export function AppContextWrapper({ children }: Props) {
  const toast = useRef(null);

  const sharedStates: AppContext = {
    toast,
  };

  return <Context.Provider value={sharedStates}>{children}</Context.Provider>;
}

export function useAppContext() {
  return useContext(Context);
}
