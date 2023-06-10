import { useAppContext } from '@/cdn/AppContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import useDelete from '@/cdn/hooks/useDelete';

const useAnimalDocumentDeleteMutation = (
  onSuccess: Function,
  token?: string
) => {
  const { toast } = useAppContext();

  return useDelete({
    url: ApiRoutes.ANIMAL_DOCUMENTS,
    token: token,
    onSuccess: () => {
      onSuccess();
      toast.current.show({
        severity: 'success',
        summary: 'Document',
        detail: 'Document supprimé avec succès',
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

export default useAnimalDocumentDeleteMutation;
