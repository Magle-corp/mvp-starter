type ApiError = {
  code?: number;
  message: string;
};

type Hydra<T> = {
  'hydra:member': T;
  'hydra:totalItems': number;
};

type MediaObject = {
  id: number;
  contentUrl: string;
  filePath?: string;
  created: Date;
};

export type { ApiError, Hydra, MediaObject };
