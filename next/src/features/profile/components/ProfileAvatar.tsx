import { Avatar, AvatarProps } from 'primereact/avatar';
import { TbUser } from 'react-icons/tb';
import { User } from '@/features/profile/types/User';

type ProfileAvatar = {
  user?: User;
} & AvatarProps;

const ProfileAvatar = (props: ProfileAvatar) => {
  const avatarImage =
    props.user?.avatar && props.user.avatar.filePath
      ? 'http://localhost:8080/media/' + props.user.avatar.filePath
      : undefined;

  return (
    <Avatar
      image={avatarImage ? avatarImage : undefined}
      template={avatarImage ? undefined : <TbUser />}
      {...props}
    />
  );
};

export default ProfileAvatar;
