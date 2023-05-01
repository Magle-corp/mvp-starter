import { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from '@/cdn/types/Api';
import { AuthToken } from '@/features/authentication/types/AuthToken';

type UseMutation<T> = {
  url: string;
  key?: string;
  token?: AuthToken['token'];
  onSuccess?: (data: AxiosResponse<T>) => void;
  onError?: (error: AxiosError<ApiError> | unknown) => void;
};

type UseQuery<T> = {
  url: string;
  key: string;
  token?: AuthToken['token'];
  onSuccess?: (data: AxiosResponse<T>) => void;
  onError?: (error: AxiosError<ApiError>) => void;
  enabled?: boolean;
};

export type { UseMutation, UseQuery };
