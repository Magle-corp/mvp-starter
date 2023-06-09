import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import api from '@/cdn/utils/api';
import { ApiError } from '@/cdn/types/Api';
import { UseMutation } from '@/cdn/types/Query';

const UsePut = <T,>(props: UseMutation<T>) => {
  if (props.token) {
    api.defaults.headers.common.Authorization = `Bearer ${props.token}`;
  }

  return useMutation([props.key], {
    mutationFn: async (payload: T) => {
      return api.put(props.url, payload);
    },
    onSuccess: (data) => {
      props.onSuccess && props.onSuccess(data);
    },
    onError: (error: AxiosError<ApiError>) => {
      props.onError && props.onError(error);
    },
  });
};

export default UsePut;
