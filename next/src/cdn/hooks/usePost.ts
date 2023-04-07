import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '@/cdn/utils/api';
import { ApiError } from '@/cdn/types/ApiResponse';

const usePost = <T>(url: string, onSuccess?: Function, onError?: Function) => {
  return useMutation({
    mutationFn: async (payload: T) => {
      return api.post(url, payload);
    },
    onSuccess: (data, variables) => {
      onSuccess && onSuccess(data, variables);
    },
    onError: (error: AxiosError<ApiError>, variables) => {
      onError && onError(error, variables);
    },
  });
};

export default usePost;
