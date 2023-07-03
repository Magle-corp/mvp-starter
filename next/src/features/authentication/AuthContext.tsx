import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { AuthToken } from '@/features/authentication/types/AuthToken';
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
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const publicPages: string[] = [AppPages.AUTH_SIGN_IN];
  const publicPage = publicPages.includes(router.pathname);

  const organizationPages: string[] = [AppPages.BO_SETTINGS_PROFILE];
  const organizationPage = !organizationPages.includes(router.pathname);

  useEffect(() => {
    if (!publicPage) {
      const token = authService.getLocalAuthToken();

      if (token) {
        const validToken = authService.tokenCompleteCheck(token);

        if (validToken) {
          setToken(token);
        } else {
          getFreshToken(token);
        }
      }
    }

    setLoading(false);
  }, [publicPage, setToken]);

  const getFreshToken = async (authToken: AuthToken) => {
    const freshToken = await authService.fetchRefreshToken(authToken);

    if (freshToken) {
      const validFreshToken = authService.tokenCompleteCheck(freshToken);

      if (validFreshToken) {
        setToken(freshToken);
        authService.setLocalAuthToken(freshToken);
      }
    }
  };

  const login = (token: AuthToken) => {
    const validToken = authService.tokenCompleteCheck(token);

    if (validToken) {
      setToken(token);
      authService.setLocalAuthToken(token);
    }
  };

  const sharedStates: AuthContext = {
    publicPage,
    organizationPage,
    loading,
    token,
    getFreshToken,
    login,
  };

  if (token) {
    const payload = authService.getAuthTokenPayload(token);
    sharedStates.organization = payload?.organizations[0];
    sharedStates.userId = payload?.user_id;
  }

  return <Context.Provider value={sharedStates}>{children}</Context.Provider>;
}

export function useAuthContext() {
  return useContext(Context);
}
