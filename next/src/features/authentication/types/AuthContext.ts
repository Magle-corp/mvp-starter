import { AuthToken } from '@/features/authentication/types/AuthToken';
import { User } from '@/features/profile/types/User';
import Organization from '@/features/organization/types/Organization';

type AuthContext = {
  loading: boolean;
  token?: AuthToken;
  backOfficePublicPage: boolean;
  organization?: Organization;
  user?: User;
  getFreshToken: Function;
};

export default AuthContext;
