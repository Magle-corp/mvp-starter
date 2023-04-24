import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import api from '@/cdn/utils/api';
import { ApiError } from '@/cdn/types/ApiResponse';
import { AuthToken } from '@/features/authentication/types/AuthToken';

type useGet<T> = {
  url: string;
  token?: AuthToken['token'];
  key: string;
  onSuccess?: (data: AxiosResponse<T>) => void;
  onError?: (error: AxiosError<ApiError>) => void;
  enabled?: boolean;
};

const useGet = <T,>(props: useGet<T>) => {
  if (props.token) {
    api.defaults.headers.common.Authorization = `Bearer ${props.token}`;
  }

  return useQuery([props.key], {
    queryFn: () => {
      return api.get(props.url);
    },
    retry: false,
    onSuccess: (data) => {
      props.onSuccess && props.onSuccess(data);
    },
    onError: (error: AxiosError<ApiError>) => {
      props.onError && props.onError(error);
    },
    enabled: props.enabled ?? true,
  });
};

export default useGet;
