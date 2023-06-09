import { useState } from 'react';
import styled from 'styled-components';
import { AvatarProps } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import Medias from '@/cdn/enums/Medias';
import { UseMutationResult } from '@/cdn/types/Query';
import { avatarConstraints } from '@/features/documents/conf/fileConstraints';
import AvatarUploadDialog from '@/features/documents/components/AvatarUploadDialog';
import { Animal } from '@/features/animals/types/Animal';
import AnimalAvatar from '@/features/animals/components/AnimalAvatar';

type AnimalAvatarUploader = {
  animal: Animal;
  onCreate: (formData: FormData) => void;
  createQuery: UseMutationResult<FormData>;
  onDelete: Function;
  deleteQuery: UseMutationResult<any>;
} & AvatarProps;

const AnimalAvatarUploader = (props: AnimalAvatarUploader) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const DialogAnimalAvatar = (
    <StyledDialogProfileAvatar
      shape="circle"
      className="tooltip-target"
      data-pr-tooltip="Changer la photo de profil"
      animal={props.animal}
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
        animal={props.animal}
      />
      <AvatarUploadDialog
        relatedEntityId={props.animal.id}
        avatar={DialogAnimalAvatar}
        avatarType={Medias.ANIMAL_AVATAR}
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

const StyledProfileAvatar = styled(AnimalAvatar)`
  width: 100px !important;
  height: 100px !important;

  svg {
    width: 50px !important;
    height: 50px !important;
  }
`;

const StyledDialogProfileAvatar = styled(AnimalAvatar)`
  width: 150px !important;
  height: 150px !important;

  svg {
    width: 80px !important;
    height: 80px !important;
  }
`;

export default AnimalAvatarUploader;
