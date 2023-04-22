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
  organizations: number[];
};

export type { AuthToken, AuthTokenPayload };
