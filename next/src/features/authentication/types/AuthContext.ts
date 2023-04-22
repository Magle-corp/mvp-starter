import {
  AuthToken,
  AuthTokenPayload,
} from '@/features/authentication/types/AuthToken';

type AuthContext = {
  publicPage: boolean;
  token: AuthToken | null;
  tokenPayload: AuthTokenPayload | null;
  loading: boolean;
  login: Function;
};

export default AuthContext;
