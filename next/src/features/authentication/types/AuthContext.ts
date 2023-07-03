import { AuthToken } from '@/features/authentication/types/AuthToken';
import Organization from '@/features/organization/types/Organization';
import User from '@/features/profile/types/User';

type AuthContext = {
  loading: boolean;
  token?: AuthToken;
  organization?: Organization;
  userId?: User['id'];
  getFreshToken: Function;
};

export default AuthContext;
