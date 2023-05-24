import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import api from '@/cdn/utils/api';
import { ApiError } from '@/cdn/types/Api';
import { UseMutation } from '@/cdn/types/Query';

const usePost = <T,>(props: UseMutation<T>) => {
  if (props.token) {
    api.defaults.headers.common.Authorization = `Bearer ${props.token}`;
  }

  if (props.mediaObject) {
    api.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  }

  return useMutation([props.key], {
    mutationFn: async (payload: T) => {
      return api.post(props.url, payload);
    },
    onSuccess: (data) => {
      props.onSuccess && props.onSuccess(data);
    },
    onError: (error: AxiosError<ApiError>) => {
      props.onError && props.onError(error);
    },
  });
};

export default usePost;
