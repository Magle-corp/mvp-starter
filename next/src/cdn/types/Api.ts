type ApiError = {
  code?: number;
  message: string;
};

type Hydra<T> = {
  'hydra:member': T;
  'hydra:totalItems': number;
};

export type { ApiError, Hydra };
