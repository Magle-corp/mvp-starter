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

const backOfficePublicPages = ['/admin/settings/profile'];

// @ts-ignore
const Context = createContext<AuthContext>();

export function AuthContextWrapper({ children }: Props) {
  const [token, setToken] = useState<AuthToken>();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const backOfficePublicPage = backOfficePublicPages.includes(router.asPath);

  useEffect(() => {
    const token = authService.getLocalAuthToken();

    if (token) {
      const validToken = authService.tokenCompleteCheck(token);

      if (validToken) {
        setToken(token);
      }

      if (!validToken) {
        getFreshToken(token);
      }
    }

    if (!token) {
      router.push(AppPages.AUTH_SIGN_IN);
    }

    setLoading(false);
  }, []);

  const getFreshToken = async (authToken: AuthToken) => {
    const freshToken = await authService.fetchRefreshToken(authToken);

    if (freshToken) {
      const validFreshToken = authService.tokenCompleteCheck(freshToken);

      if (validFreshToken) {
        setToken(freshToken);
        authService.setLocalAuthToken(freshToken);
      }

      if (!validFreshToken) {
        await router.push(AppPages.AUTH_SIGN_IN);
      }
    }

    if (!freshToken) {
      await router.push(AppPages.AUTH_SIGN_IN);
    }
  };

  const sharedStates: AuthContext = {
    loading,
    token,
    backOfficePublicPage,
    getFreshToken,
  };

  if (token) {
    const payload = authService.getAuthTokenPayload(token);

    if (payload) {
      sharedStates.organization = payload.organizations[0];
      sharedStates.user = payload.user;
    }
  }

  return <Context.Provider value={sharedStates}>{children}</Context.Provider>;
}

export function useAuthContext() {
  return useContext(Context);
}
