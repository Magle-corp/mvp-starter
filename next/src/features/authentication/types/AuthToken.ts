type AuthToken = {
  token: string;
  refresh_token: string;
};

type AuthTokenPayload = {
  email: string;
  exp: number;
  iat: number;
  roles: string[];
};

export type { AuthToken, AuthTokenPayload };
