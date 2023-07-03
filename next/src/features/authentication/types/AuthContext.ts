import { AuthToken } from '@/features/authentication/types/AuthToken';
import Organization from '@/features/organization/types/Organization';
import User from '@/features/profile/types/User';

type AuthContext = {
  publicPage: boolean;
  organizationPage: boolean;
  loading: boolean;
  token: AuthToken | null;
  organization?: Organization;
  userId?: User['id'];
  getFreshToken: Function;
  login: Function;
};

export default AuthContext;
