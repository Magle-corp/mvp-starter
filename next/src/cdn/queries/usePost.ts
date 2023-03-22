import { useMutation } from '@tanstack/react-query';
import api from '@/cdn/utils/api';

const usePost = <T>(url: string, onSuccess?: Function, onError?: Function) => {
  return useMutation(
    async (payload: T) => {
      return api.post(url, payload);
    },
    {
      onSuccess: () => {
        onSuccess && onSuccess();
      },
      onError: (error, variables, context) => {
        onError ? onError() : console.group(`[ERROR] usePost on : ${url}`);
        console.log(error);
        console.log(variables);
        console.log(context);
        console.groupEnd();
      },
    }
  );
};

export default usePost;
