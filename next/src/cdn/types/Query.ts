import { AxiosError, AxiosResponse } from 'axios';
import { UseQueryResult } from '@tanstack/react-query';
import { ApiError, Hydra } from '@/cdn/types/Api';
import { AuthToken } from '@/features/authentication/types/AuthToken';

type UseMutation<T> = {
  url: string;
  key?: string;
  token?: AuthToken['token'];
  onSuccess?: (data: AxiosResponse<T>) => void;
  onError?: (error: AxiosError<ApiError> | unknown) => void;
  mediaObject?: boolean;
};

type UseQuery<T> = {
  url: string;
  key: string;
  token?: AuthToken['token'];
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError<ApiError>) => void;
  enabled?: boolean;
  staleTime?: number;
};

type UseGet<T> = {
  entityId?: number;
  token?: UseQuery<T>['token'];
  onSuccess?: UseQuery<T>['onSuccess'];
  onError?: UseQuery<T>['onError'];
  enabled?: UseQuery<T>['enabled'];
  staleTime?: UseQuery<T>['staleTime'];
};

type UseGetResult<T> = UseQueryResult<
  AxiosResponse<T, any>,
  AxiosError<ApiError, any>
>;

type UseQueryCollection<T> = {
  url: string;
  key: string;
  token?: AuthToken['token'];
  onSuccess?: (data: Hydra<T>) => void;
  onError?: (error: AxiosError<ApiError>) => void;
  enabled?: boolean;
  staleTime?: number;
};

type UseGetCollection<T> = {
  organizationId?: number;
  token?: UseQueryCollection<T>['token'];
  onSuccess?: UseQueryCollection<T>['onSuccess'];
  onError?: UseQueryCollection<T>['onError'];
  enabled?: UseQueryCollection<T>['enabled'];
  staleTime?: UseQueryCollection<T>['staleTime'];
};

export type {
  UseMutation,
  UseQuery,
  UseGet,
  UseGetResult,
  UseQueryCollection,
  UseGetCollection,
};
