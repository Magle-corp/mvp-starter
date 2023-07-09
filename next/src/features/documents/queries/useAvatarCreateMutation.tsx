import Medias from '@/cdn/enums/Medias';
import usePost from '@/cdn/hooks/usePost';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';

const useAvatarCreateMutation = (
  url: string,
  avatarType:
    | Medias.ANIMAL_AVATAR
    | Medias.USER_AVATAR
    | Medias.ORGANIZATION_AVATAR,
  token?: string,
  onSuccess?: Function,
  onError?: Function
) => {
  const { toast } = useBackOfficeContext();
  let toastSummary = '';

  switch (avatarType) {
    case Medias.ANIMAL_AVATAR:
      toastSummary = 'Animal';
      break;
    case Medias.USER_AVATAR:
      toastSummary = 'Profil';
      break;
    case Medias.ORGANIZATION_AVATAR:
      toastSummary = 'Organisation';
      break;
  }

  return usePost<FormData>({
    url: url,
    token: token,
    mediaObject: true,
    onSuccess: () => {
      toast.current.show({
        severity: 'success',
        summary: toastSummary,
        detail: 'Avatar enregistré avec succès',
      });
      onSuccess && onSuccess();
    },
    onError: () => {
      toast.current.show({
        severity: 'error',
        summary: toastSummary,
        detail: 'Un problème technique est survenu',
      });
      onError && onError();
    },
  });
};

export default useAvatarCreateMutation;
