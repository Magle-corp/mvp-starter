import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import api from '@/cdn/utils/api';
import { ApiError, Hydra } from '@/cdn/types/Api';
import { UseQuery } from '@/cdn/types/Query';

const useGet = <T,>(props: UseQuery<T>) => {
  if (props.token) {
    api.defaults.headers.common.Authorization = `Bearer ${props.token}`;
  }

  return useQuery([props.key], {
    queryFn: () => {
      return api.get<Hydra<T>>(props.url);
    },
    onSuccess: ({ data }) => {
      props.onSuccess && props.onSuccess(data);
    },
    onError: (error: AxiosError<ApiError>) => {
      props.onError && props.onError(error);
    },
    retry: false,
    enabled: props.enabled ?? true,
    staleTime: props.staleTime ?? 180000,
  });
};

export default useGet;
