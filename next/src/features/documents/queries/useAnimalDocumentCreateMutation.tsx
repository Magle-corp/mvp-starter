import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';

const useAnimalDocumentCreateMutation = (
  onSuccess: Function,
  token?: string
) => {
  const { toast } = useBackOfficeContext();

  return usePost<FormData>({
    url: ApiRoutes.ANIMAL_DOCUMENTS,
    token: token,
    mediaObject: true,
    onSuccess: () => {
      onSuccess();
      toast.current.show({
        severity: 'success',
        summary: 'Animal',
        detail: 'Document enregistré avec succès',
      });
    },
    onError: () =>
      toast.current.show({
        severity: 'error',
        summary: 'Document',
        detail: 'Un problème technique est survenu',
      }),
  });
};

export default useAnimalDocumentCreateMutation;
