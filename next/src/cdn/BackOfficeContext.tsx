import { createContext, ReactNode, useContext, useRef } from 'react';
import BackOfficeContext from '@/cdn/types/BackOfficeContext';

type Props = {
  children: ReactNode;
};

// @ts-ignore
const Context = createContext<BackOfficeContext>();

export function BackOfficeContextWrapper({ children }: Props) {
  const toast = useRef(null);

  const sharedStates: BackOfficeContext = {
    toast,
  };

  return <Context.Provider value={sharedStates}>{children}</Context.Provider>;
}

export function useBackOfficeContext() {
  return useContext(Context);
}
