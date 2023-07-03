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
  const [token, setToken] = useState<AuthToken>();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const token = authService.getLocalAuthToken();

    if (token) {
      const validToken = authService.tokenCompleteCheck(token);

      if (validToken) {
        setToken(token);

        if (!authService.getAuthTokenPayload(token)?.organizations[0]) {
          router.push(AppPages.BO_SETTINGS_ORGANIZATION);
        }
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

        if (!authService.getAuthTokenPayload(freshToken)?.organizations[0]) {
          await router.push(AppPages.BO_SETTINGS_ORGANIZATION);
        }
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
    getFreshToken,
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
