import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import authService from '@/features/authentication/utils/AuthService';
import { AuthToken } from '@/features/authentication/types/AuthToken';

type Props = {
  children: ReactNode;
};

type SharedStates = {
  authenticated: boolean;
  loading: boolean;
  login: Function;
};

// @ts-ignore
const AuthContext = createContext<SharedStates>();

export function AuthContextWrapper({ children }: Props) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = authService.getLocalAuthToken();

    if (token) {
      const validToken = authService.isValidToken(token);

      if (validToken) {
        const tokenPayload = authService.getAuthTokenPayload(token);

        if (tokenPayload) {
          const validPayload = authService.isValidTokenPayload(tokenPayload);

          if (validPayload) {
            const expiredToken = authService.isExpiredAuthToken(tokenPayload);

            if (expiredToken) {
              getFreshToken(token);
            } else {
              setAuthenticated(true);
            }
          } else {
            authService.removeLocalAuthToken();
          }
        } else {
          authService.removeLocalAuthToken();
        }
      } else {
        authService.removeLocalAuthToken();
      }
    }

    setLoading(false);
  }, []);

  const getFreshToken = async (authToken: AuthToken) => {
    const freshToken = await authService.fetchRefreshToken(authToken);

    if (freshToken) {
      setAuthenticated(true);
      authService.setLocalAuthToken(freshToken);
    }
  };

  const login = (token: AuthToken) => {
    setAuthenticated(true);
    authService.setLocalAuthToken(token);
  };

  const sharedStates: SharedStates = {
    authenticated,
    loading,
    login,
  };

  return (
    <AuthContext.Provider value={sharedStates}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
