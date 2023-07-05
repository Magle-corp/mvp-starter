import { useState } from 'react';
import styled from 'styled-components';
import { AvatarProps } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import Medias from '@/cdn/enums/Medias';
import { UseMutationResult } from '@/cdn/types/Query';
import { avatarConstraints } from '@/features/documents/conf/fileConstraints';
import AvatarUploadDialog from '@/features/documents/components/AvatarUploadDialog';
import { User } from '@/features/profile/types/User';
import ProfileAvatar from '@/features/profile/components/ProfileAvatar';

type ProfileAvatarUploader = {
  user: User;
  onCreate: (formData: FormData) => void;
  createQuery: UseMutationResult<FormData>;
  onDelete: Function;
  deleteQuery: UseMutationResult<any>;
} & AvatarProps;

const ProfileAvatarUploader = (props: ProfileAvatarUploader) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const DialogProfileAvatar = (
    <StyledDialogProfileAvatar
      shape="circle"
      className="tooltip-target"
      data-pr-tooltip="Changer la photo de profil"
      user={props.user}
    />
  );

  return (
    <div>
      <Tooltip target=".tooltip-target" mouseTrack mouseTrackLeft={20} />
      <StyledProfileAvatar
        shape="circle"
        size="xlarge"
        onClick={() => setDialogOpen(true)}
        className="tooltip-target"
        data-pr-tooltip="Changer la photo de profil"
        user={props.user}
      />
      <AvatarUploadDialog
        relatedEntityId={props.user.id}
        avatar={DialogProfileAvatar}
        avatarType={Medias.USER_AVATAR}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        fileConstraints={avatarConstraints}
        onCreate={props.onCreate}
        createQuery={props.createQuery}
        onDelete={props.onDelete}
        deleteQuery={props.deleteQuery}
      />
    </div>
  );
};

const StyledProfileAvatar = styled(ProfileAvatar)`
  width: 100px !important;
  height: 100px !important;

  svg {
    width: 50px !important;
    height: 50px !important;
  }
`;

const StyledDialogProfileAvatar = styled(ProfileAvatar)`
  width: 150px !important;
  height: 150px !important;

  svg {
    width: 80px !important;
    height: 80px !important;
  }
`;

export default ProfileAvatarUploader;
