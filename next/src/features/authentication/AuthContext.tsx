import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import authService from '@/features/authentication/utils/AuthService';
import {
  AuthToken,
  AuthTokenPayload,
} from '@/features/authentication/types/AuthToken';

type Props = {
  children: ReactNode;
};

type SharedStates = {
  token: AuthTokenPayload | null;
  loading: boolean;
  login: Function;
};

// @ts-ignore
const AuthContext = createContext<SharedStates>();

export function AuthContextWrapper({ children }: Props) {
  const [token, setToken] = useState<AuthTokenPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = authService.getLocalAuthToken();

    if (token) {
      const validToken = authService.tokenCompleteCheck(token);

      if (validToken) {
        setToken(authService.getAuthTokenPayload(token));
      } else {
        getFreshToken(token);
      }
    }

    setLoading(false);
  }, []);

  const getFreshToken = async (authToken: AuthToken) => {
    const freshToken = await authService.fetchRefreshToken(authToken);

    if (freshToken) {
      const validFreshToken = authService.tokenCompleteCheck(freshToken);

      if (validFreshToken) {
        setToken(authService.getAuthTokenPayload(freshToken));
        authService.setLocalAuthToken(freshToken);
      }
    }
  };

  const login = (token: AuthToken) => {
    const validToken = authService.tokenCompleteCheck(token);

    if (validToken) {
      setToken(authService.getAuthTokenPayload(token));
      authService.setLocalAuthToken(token);
    }
  };

  const sharedStates: SharedStates = {
    token,
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
