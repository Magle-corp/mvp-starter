import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import api from '@/cdn/utils/api';
import { ApiError } from '@/cdn/types/ApiResponse';
import { AuthToken } from '@/features/authentication/types/AuthToken';

type UsePost<T> = {
  url: string;
  token?: AuthToken['token'];
  key?: string;
  onSuccess?: (data: AxiosResponse<T>) => void;
  onError?: (error: AxiosError<ApiError> | unknown) => void;
};

const usePost = <T,>(props: UsePost<T>) => {
  if (props.token) {
    api.defaults.headers.common.Authorization = `Bearer ${props.token}`;
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
