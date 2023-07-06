import { Avatar, AvatarProps } from 'primereact/avatar';
import { TbBuildingCottage } from 'react-icons/tb';
import Organization from '@/features/organization/types/Organization';

type OrganizationAvatar = {
  organization?: Organization;
} & AvatarProps;

const OrganizationAvatar = (props: OrganizationAvatar) => {
  const avatarImage =
    props.organization?.avatar && props.organization.avatar.filePath
      ? 'http://localhost:8080/media/' + props.organization.avatar.filePath
      : undefined;

  return (
    <Avatar
      image={avatarImage ? avatarImage : undefined}
      template={avatarImage ? undefined : <TbBuildingCottage />}
      {...props}
    />
  );
};

export default OrganizationAvatar;
