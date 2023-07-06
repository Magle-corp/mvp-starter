import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import useDelete from '@/cdn/hooks/useDelete';
import { useAuthContext } from '@/features/authentication/AuthContext';
import ProfileAvatarUploader from '@/features/profile/components/ProfileAvatarUploader';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';
import Card from '@/ui/atoms/Card';

const UpdateProfileCard = () => {
  const { getFreshToken, token, user } = useAuthContext();
  const { toast } = useBackOfficeContext();

  const avatarPostMutation = usePost<FormData>({
    url: ApiRoutes.USER_AVATARS,
    token: token?.token,
    mediaObject: true,
    onSuccess: () => {
      getFreshToken(token);
      toast.current.show({
        severity: 'success',
        summary: 'Profil',
        detail: 'Avatar enregistré avec succès',
      });
    },
    onError: () => errorToast(),
  });

  const onAvatarPostSubmit = (formData: FormData) => {
    avatarPostMutation.mutate(formData);
  };

  const avatarDeleteMutation = useDelete({
    url: ApiRoutes.USER_AVATARS,
    token: token?.token,
    onSuccess: () => {
      getFreshToken(token);
      toast.current.show({
        severity: 'success',
        summary: 'Profil',
        detail: 'Avatar supprimé avec succès',
      });
    },
    onError: () => errorToast(),
  });

  const onAvatarDeleteSubmit = () => {
    if (user?.avatar?.id) {
      avatarDeleteMutation.mutate(user.avatar.id);
    }
  };

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Animal',
      detail: 'Un problème technique est survenu',
    });

  const cardDescription = (
    <p>votre profil personnel n&apos;est jamais public</p>
  );

  console.log(user);

  return (
    <Card title="Mettre à jour mon profil" description={cardDescription}>
      <ProfileAvatarUploader
        user={user}
        onCreate={onAvatarPostSubmit}
        createQuery={avatarPostMutation}
        onDelete={onAvatarDeleteSubmit}
        deleteQuery={avatarDeleteMutation}
      />
    </Card>
  );
};

export default UpdateProfileCard;
