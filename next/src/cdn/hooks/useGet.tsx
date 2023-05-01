import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import api from '@/cdn/utils/api';
import { ApiError } from '@/cdn/types/Api';
import { UseQuery } from '@/cdn/types/Query';

const useGet = <T,>(props: UseQuery<T>) => {
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
