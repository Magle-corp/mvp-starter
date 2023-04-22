import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '@/cdn/utils/api';
import { ApiError } from '@/cdn/types/ApiResponse';

type UsePost = {
  url: string;
  onSuccess?: Function;
  onError?: Function;
};

const usePost = <T,>(props: UsePost) => {
  return useMutation({
    mutationFn: async (payload: T) => {
      return api.post(props.url, payload);
    },
    onSuccess: (data, variables) => {
      props.onSuccess && props.onSuccess(data, variables);
    },
    onError: (error: AxiosError<ApiError>, variables) => {
      props.onError && props.onError(error, variables);
    },
  });
};

export default usePost;
