import Organization from '@/features/organization/types/Organization';

type AuthToken = {
  token: string;
  refresh_token: string;
};

type AuthTokenPayload = {
  email: string;
  exp: number;
  iat: number;
  roles: string[];
  user_id: number;
  organizations: Organization[];
};

export type { AuthToken, AuthTokenPayload };
