type ApiError = {
  '@context': string;
  '@type': string;
  'hydra:description': string;
  'hydra:title': string;
};

type ApiUnauthorized = {
  code: number;
  message: string;
};

export type { ApiError, ApiUnauthorized };
