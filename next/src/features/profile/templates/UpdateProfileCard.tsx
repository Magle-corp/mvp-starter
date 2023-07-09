import ApiRoutes from '@/cdn/enums/ApiRoutes';
import Medias from '@/cdn/enums/Medias';
import { useAuthContext } from '@/features/authentication/AuthContext';
import useAvatarCreateMutation from '@/features/documents/queries/useAvatarCreateMutation';
import useAvatarDeleteMutation from '@/features/documents/queries/useAvatarDeleteMutation';
import ProfileAvatarUploader from '@/features/profile/components/ProfileAvatarUploader';
import Card from '@/ui/atoms/Card';

const UpdateProfileCard = () => {
  const { getFreshToken, token, user } = useAuthContext();

  const avatarCreateMutation = useAvatarCreateMutation(
    ApiRoutes.USER_AVATARS,
    Medias.USER_AVATAR,
    token?.token,
    () => getFreshToken(token)
  );

  const onAvatarCreateSubmit = (formData: FormData) => {
    avatarCreateMutation.mutate(formData);
  };

  const avatarDeleteMutation = useAvatarDeleteMutation(
    ApiRoutes.USER_AVATARS,
    Medias.USER_AVATAR,
    token?.token,
    () => getFreshToken(token)
  );

  const onAvatarDeleteSubmit = () => {
    if (user?.avatar?.id) {
      avatarDeleteMutation.mutate(user.avatar.id);
    }
  };

  const cardDescription = (
    <p>votre profil personnel n&apos;est jamais public</p>
  );

  return (
    <Card title="Mettre à jour mon profil" description={cardDescription}>
      <ProfileAvatarUploader
        user={user}
        onCreate={onAvatarCreateSubmit}
        createQuery={avatarCreateMutation}
        onDelete={onAvatarDeleteSubmit}
        deleteQuery={avatarDeleteMutation}
      />
    </Card>
  );
};

export default UpdateProfileCard;
