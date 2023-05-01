import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import {
  AuthToken,
  AuthTokenPayload,
} from '@/features/authentication/types/AuthToken';
import AuthContext from '@/features/authentication/types/AuthContext';
import authService from '@/features/authentication/utils/AuthService';
import AppPages from '@/cdn/enums/AppPages';

type Props = {
  children: ReactNode;
};

// @ts-ignore
const Context = createContext<AuthContext>();

export function AuthContextWrapper({ children }: Props) {
  const [token, setToken] = useState<AuthToken | null>(null);
  const [tokenPayload, setTokenPayload] = useState<AuthTokenPayload | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const publicPages: string[] = [AppPages.AUTH_SIGN_IN];
  const publicPage = publicPages.includes(router.pathname);

  useEffect(() => {
    if (!publicPage) {
      const token = authService.getLocalAuthToken();

      if (token) {
        const validToken = authService.tokenCompleteCheck(token);

        if (validToken) {
          setToken(token);
          setTokenPayload(authService.getAuthTokenPayload(token));
        } else {
          getFreshToken(token);
        }
      }
    }

    setLoading(false);
  }, [publicPage, setTokenPayload, setToken]);

  const getFreshToken = async (authToken: AuthToken) => {
    const freshToken = await authService.fetchRefreshToken(authToken);

    if (freshToken) {
      const validFreshToken = authService.tokenCompleteCheck(freshToken);

      if (validFreshToken) {
        setToken(freshToken);
        setTokenPayload(authService.getAuthTokenPayload(freshToken));
        authService.setLocalAuthToken(freshToken);
      }
    }
  };

  const login = (token: AuthToken) => {
    const validToken = authService.tokenCompleteCheck(token);

    if (validToken) {
      setToken(token);
      setTokenPayload(authService.getAuthTokenPayload(token));
      authService.setLocalAuthToken(token);
    }
  };

  const logout = () => {
    authService.removeLocalAuthToken();
    setToken(null);
    setTokenPayload(null);
  };

  const sharedStates: AuthContext = {
    publicPage,
    token,
    tokenPayload,
    loading,
    getFreshToken,
    login,
    logout,
  };

  return <Context.Provider value={sharedStates}>{children}</Context.Provider>;
}

export function useAuthContext() {
  return useContext(Context);
}
